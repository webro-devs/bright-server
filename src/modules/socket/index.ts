import { Server } from "socket.io";
import { OnCreate, OnDisconnect, OnJoin } from "./socket.controller";

export const connectSocket = (server: any) => {
    const io = new Server(server);

    io.on("connection", (socket) => {
        console.log(`a user: ${socket.id} connected from Socket.io`);
        socket.on('join', (data) => OnJoin(data, socket, io))
        socket.on('create', (roomId) => OnCreate(roomId, socket, io))
        socket.on('disconnect', () => OnDisconnect(socket));
    });
}