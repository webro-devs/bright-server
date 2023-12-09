import { OnJoinType } from "./types/user.types";
import { socketService } from "./socket.module";
import { newsEditorService } from "../editors";
import { adminService } from "../admin";
import { UpdateAdminProfileDto } from "../admin/dto";
import { newsService } from "../news";
import { messageService } from "../chat-message";
import {
  UpdateNestedObject,
  SocketNewsOnChangeObject,
} from "../../infra/helpers";

let myTimeout = setTimeout(() => {}, 3000);
let obj: any = {};

function myStopFunction() {
  clearTimeout(myTimeout);
}

export const OnJoin = async (data: OnJoinType, socket: any, io: any) => {
  try {
    await adminService.changeProfile(data?.id, {
      isOnline: true,
    } as UpdateAdminProfileDto);
    if (data && data?.id) {
      await socketService.create({ socketId: socket.id, admin: data?.id });
    }
    socket.emit("user_joined", data?.id);
  } catch (error) {
    console.log(error);
  }
};

export const OnDisconnect = async (socket: any, io: any) => {
  try {
    const date = new Date();
    const data = await socketService.getBySocketId(socket?.id);
    if (data?.admin) {
      await adminService.changeProfile(data?.admin, {
        isOnline: false,
        lastSeen: date,
      } as UpdateAdminProfileDto);
    }
    if (data?.news) {
      if (io.sockets.adapter.rooms.get(data.news)?.size == 1) {
        const news = await newsService.getByIdForUpdateIndexing(data.news);
        await newsService.updateIsEditing(news.id, false, news.updated_at);
      }
      const index = obj[data.news]["onlineEditors"]?.findIndex(
        (o) => o.id == data.admin,
      );
      if (index != -1) {
        obj[data.news]["onlineEditors"].splice(index, 1);
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
    const news = await newsService.getByIdForUpdateIndexing(roomId);
    if (io.sockets.adapter.rooms.get(roomId)?.size == 1) {
      await newsService.updateIsEditing(roomId, true, news.updated_at);
      io.sockets.emit("news_editing", roomId);
    }
    const changedObject = UpdateNestedObject(obj?.[roomId], news);
    await socketService.updateNews(socket?.id, roomId);

    io.to(socket.id).emit("get_changes", changedObject);
  } catch (error) {
    console.log(error);
  }
};

export const OnLeave = async (roomId: string, socket: any, io: any) => {
  try {
    if (io.sockets.adapter.rooms.get(roomId)?.size == 1) {
      const news = await newsService.getByIdForUpdateIndexing(roomId);
      await newsService.updateIsEditing(roomId, false, news.updated_at);
      io.sockets.emit("news_end_editing", roomId);
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
    obj = SocketNewsOnChangeObject(
      obj,
      data.roomId,
      data.inputName,
      data.value,
    );
    myStopFunction();
    myTimeout = setTimeout(async () => {
      const res = await newsEditorService.updateEditDate(
        data.roomId,
        data.userId,
      );
      const edition = await newsEditorService.getById(res);
      io.to(data.roomId).emit("set_editor", edition);
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
    obj = SocketNewsOnChangeObject(obj, data.roomId, "", "");
    obj[data.roomId]["onlineEditors"]?.push(user);
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
    const index = obj[data.roomId]["onlineEditors"]?.findIndex(
      (o) => o.id == data.userId,
    );
    obj[data.roomId]["onlineEditors"].splice(index, 1);
    socket.broadcast.to(data.roomId).emit("input_blur", data);
  } catch (error) {
    console.log(error);
  }
};

export async function newMessage(data, socket, io) {
  try {
    const { msgId }: { msgId: string } = data;
    const message = await messageService.getById(msgId);

    socket.broadcast.to(data.roomId).emit("get_new_message", message);
  } catch (err) {
    console.log(err);
  }
}

export async function onMessageEdited(data, socket, io) {
  try {
    const { msgId, msg, roomId } = data;
    socket.broadcast.to(roomId).emit("on_edited_message", { msg, msgId });
  } catch (error) {
    console.log(error);
  }
}

export async function onMessageDeleted(data, socket, io) {
  try {
    const { msgId, roomId } = data;
    socket.broadcast.to(roomId).emit("on_deleted_message", { msgId });
  } catch (error) {
    console.log(error);
  }
}
