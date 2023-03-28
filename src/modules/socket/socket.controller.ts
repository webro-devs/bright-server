import { OnJoinType } from "./types/user.types";
import { socketService } from "./socket.module";
import { newsEditorService } from "../editors";
import { adminService } from "../admin";
import { UpdateAdminProfileDto } from "../admin/dto";

let myTimeout = setTimeout(() => {}, 3000);

function myStopFunction() {
  clearTimeout(myTimeout);
}

export const OnJoin = async (data: OnJoinType, socket: any, io: any) => {
  try {
    console.log(`User id: ${data.id} ==== Socket id: ${socket.id}`);
    await adminService.changeProfile(data?.id, {
      isOnline: true,
    } as UpdateAdminProfileDto);
    await socketService.create({ socketId: socket.id, admin: data?.id });
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
    socket.disconnect(true);
    socket = null;
  } catch (error) {
    console.log(error);
  }
};

export const OnCreate = (roomId: string, socket: any, io: any) => {
  try {
    socket.join(roomId);
  } catch (error) {
    console.log(error);
  }
};

export const OnLeave = (roomId: string, socket: any) => {
  try {
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
    myStopFunction();
    myTimeout = setTimeout(async () => {
      await newsEditorService.updateEditDate(data.roomId, data.userId);
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
