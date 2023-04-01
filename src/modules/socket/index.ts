import { Server } from "socket.io";
import {
  OnBlur,
  OnChange,
  OnCreate,
  OnDisconnect,
  OnFocus,
  OnJoin,
  OnLeave,
} from "./socket.controller";

export const connectSocket = (server: any) => {
  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log(`a user: ${socket.id} connected from Socket.io`);
    socket.on("join", (data) => OnJoin(data, socket, io));
    socket.on("create", (roomId) => OnCreate(roomId, socket, io));
    socket.on("leave", (roomId) => OnLeave(roomId, socket, io));
    socket.on("change", (data) => OnChange(data, socket, io));
    socket.on("focus", (data) => OnFocus(data, socket));
    socket.on("blur", (data) => OnBlur(data, socket));
    socket.on("disconnect", () => OnDisconnect(socket, io));
  });
};
