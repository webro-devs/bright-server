import { OnJoinType } from "./types/user.types";
import { socketService } from "./socket.module";
import { newsEditorService } from "../editors";
import { adminService } from "../admin";
import { UpdateAdminProfileDto } from "../admin/dto";
import { newsService } from "../news";

let myTimeout = setTimeout(() => { }, 3000);
let obj: any = {};

function myStopFunction() {
  clearTimeout(myTimeout);
}

function j(obj: any, room: string, input: string, value: string) {
  const a = input.split(".");
  if (input.length) {
    if (a.length == 2) {
      if (obj?.[room]) {
        if (obj[room]?.[a[0]]) {
          obj[room][a[0]][a[1]] = value;
        } else {
          obj[room][a[0]] = {};
          obj[room][a[0]][a[1]] = value;
          obj[room]["editors"] = [];
        }
      } else {
        obj[room] = {};
        obj[room][a[0]] = {};
        obj[room][a[0]][a[1]] = value;
      }
    } else {
      if (obj?.[room]) {
        obj[room][a[0]] = value;
      } else {
        obj[room] = {};
        obj[room][a[0]] = value;
        obj[room]["editors"] = [];
      }
    }
  } else {
    if (obj?.[room]) {
      if (!obj?.[room]?.["editors"]) {
        obj[room]["editors"] = [];
      }
    } else {
      obj[room] = {};
      obj[room]["editors"] = [];
    }
  }

  return obj;
}

export const OnJoin = async (data: OnJoinType, socket: any, io: any) => {
  try {
    await adminService.changeProfile(data?.id, {
      isOnline: true,
    } as UpdateAdminProfileDto);
    await socketService.create({ socketId: socket.id, admin: data?.id });
    socket.emit("user_joined", data.id);
  } catch (error) {
    console.log(error);
  }
};

export const OnDisconnect = async (socket: any, io: any) => {
  try {
    const date = new Date();
    const data = await socketService.getBySocketId(socket?.id);
    await adminService.changeProfile(data.admin, {
      isOnline: false,
      lastSeen: date,
    } as UpdateAdminProfileDto);
    if (data?.news) {
      if (io.sockets.adapter.rooms.get(data.news)?.size == 1) {
        const news = await newsService.getByIdForUpdateIndexing(data.news);
        await newsService.updateIsEditing(news.id, false, news.updated_at);
      }
      const index = obj[data.news]["editors"]?.findIndex(
        (o) => o.id == data.admin,
      );
      if (index != -1) {
        obj[data.news]["editors"].splice(index, 1);
      }
    }
    await socketService.removeBySocketId(socket?.id);
    socket.emit("user_left", data.id);
    socket.disconnect(true);
    socket = null;
  } catch (error) {
    console.log(error);
  }
};

export const OnCreate = async (roomId: string, socket: any, io: any) => {
  try {
    socket.join(roomId);
    if (io.sockets.adapter.rooms.get(roomId).size == 1) {
      const news = await newsService.getByIdForUpdateIndexing(roomId);
      await newsService.updateIsEditing(roomId, true, news.updated_at);
      io.sockets.emit('news_editing', roomId)
    }
    await socketService.updateNews(socket?.id, roomId);
    io.to(socket.id).emit("get_changes", obj?.[roomId]);
  } catch (error) {
    console.log(error);
  }
};

export const OnLeave = async (roomId: string, socket: any, io: any) => {
  try {
    if (io.sockets.adapter.rooms.get(roomId).size == 1) {
      const news = await newsService.getByIdForUpdateIndexing(roomId);
      await newsService.updateIsEditing(roomId, false, news.updated_at);
      io.sockets.emit('news_end_editing', roomId)
    }
    socket.leave(roomId);
  } catch (error) {
    console.log(error);
  }
};

export const OnChange = async (
  data: { roomId: string; inputName: string; value: string; userId: string },
  socket: any,
  io: any,
) => {
  try {
    obj = j(obj, data.roomId, data.inputName, data.value);
    myStopFunction();
    myTimeout = setTimeout(async () => {
      const res = await newsEditorService.updateEditDate(
        data.roomId,
        data.userId,
      );
      const edition = await newsEditorService.getById(res);
      socket.to(data.roomId).emit("set_editor", edition);
    }, 3000);
    socket.broadcast.to(data.roomId).emit("input_change", data);
  } catch (error) {
    console.log(error);
  }
};

export const OnFocus = async (
  data: { roomId: string; userId: string; inputName: string },
  socket: any,
) => {
  try {
    const user = await adminService.getOnlyAdmin(data.userId);
    obj = j(obj, data.roomId, "", "");
    obj[data.roomId]["editors"]?.push(user);
    socket.broadcast.to(data.roomId).emit("input_focus", { ...data, user });
  } catch (error) {
    console.log(error);
  }
};

export const OnBlur = async (
  data: { roomId: string; userId: string; inputName: string },
  socket: any,
) => {
  try {
    const index = obj[data.roomId]["editors"]?.findIndex(
      (o) => o.id == data.userId,
      );
      obj[data.roomId]["editors"].splice(index, 1);
      socket.broadcast.to(data.roomId).emit("input_blur", data);
  } catch (error) {
    console.log(error);
  }
};
