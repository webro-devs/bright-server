import { OnJoinType } from "./types/user.types";
import { socketService } from "./socket.module";
import { newsEditorService } from "../editors";

export const OnJoin = async (data: OnJoinType, socket: any, io: any) => {
  try {
    console.log(`User id: ${data.id} ==== Socket id: ${socket.id}`);
    await socketService.create({ socketId: socket.id, admin: data?.id });
  } catch (error) {
    console.log(error);
  }
};

export const OnDisconnect = async (socket: any) => {
  try {
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
    await newsEditorService.updateEditDate(data.roomId, data.userId);
    io.sockets.in(data.roomId).emit("input_change", data);
  } catch (error) {
    console.log(error);
  }
};

export const OnInputChange = async () => {
  try {
  } catch (error) {
    console.log(error);
  }
};
