import { Server } from "socket.io";
import { OnJoin } from "./socket.controller";

export const connectSocket = (server: any) => {
    const io = new Server(server);

    io.on("connection", (socket) => {
        console.log(`a user: ${socket.id} connected from Socket.io`);
        socket.on('join', (data) => OnJoin(data, socket, io))
        socket.on('disconnect', (reason) => {
            socket.disconnect(true);
            socket = null;
          });
    });
}