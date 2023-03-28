import { OnJoinType } from "./types/user.types";
import { socketService } from "./socket.module";
import { newsEditorService } from "../editors";
import { adminService } from "../admin";
import { UpdateAdminProfileDto } from "../admin/dto";
import { newsService } from "../news";

let myTimeout = setTimeout(() => {}, 3000);
let obj: any = {};

function myStopFunction() {
  clearTimeout(myTimeout);
}

function f(obj: any, room: string, input: string, value: string) {
  let valueObj = {};
  const a = input.split(".");
  if (a.length == 2) {
    valueObj[a[0]] = {};
    valueObj[a[0]][a[1]] = value;
  } else {
    valueObj[a[0]] = value;
  }
  let roomObj = {};
  roomObj[room] = valueObj;

  obj = { ...obj, [room]: roomObj[room] };
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

export const OnDisconnect = async (socket: any) => {
  try {
    const date = new Date();
    const userId = await socketService.getBySocketId(socket?.id);
    await adminService.changeProfile(userId.admin, {
      isOnline: false,
      lastSeen: date,
    } as UpdateAdminProfileDto);
    await socketService.removeBySocketId(socket?.id);
    socket.emit("user_left", userId.id);
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
      await newsService.updateIsEditing(roomId, true);
    }
    io.to(socket.id).emit("get_changes", obj?.[roomId]);
  } catch (error) {
    console.log(error);
  }
};

export const OnLeave = async (roomId: string, socket: any, io: any) => {
  try {
    if (io.sockets.adapter.rooms.get(roomId).size == 1) {
      await newsService.updateIsEditing(roomId, false);
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
    obj = f(obj, data.roomId, data.inputName, data.value);
    myStopFunction();
    myTimeout = setTimeout(async () => {
      const res = await newsEditorService.updateEditDate(
        data.roomId,
        data.userId,
      );
      const edition = await newsEditorService.getById(res);
      io.to(data.roomId).emit("set_editor", edition);
    }, 3000);
    io.sockets.in(data.roomId).emit("input_change", data);
  } catch (error) {
    console.log(error);
  }
};

export const OnFocus = async (
  data: { roomId: string; userId: string; inputName: string },
  io: any,
) => {
  try {
    const user = await adminService.getOnlyAdmin(data.userId);
    io.sockets.in(data.roomId).emit("input_focus", { ...data, user });
  } catch (error) {
    console.log(error);
  }
};

export const OnBlur = async (
  data: { roomId: string; userId: string; inputName: string },
  io: any,
) => {
  try {
    io.sockets.in(data.roomId).emit("input_blur", data);
  } catch (error) {
    console.log(error);
  }
};
