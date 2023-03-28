import { OnJoinType } from "./types/user.types";

export const OnJoin = (data: OnJoinType, socket: any, io: any) => {
    try {
        console.log(`User id: ${data.id} ==== Socket id: ${socket.id}`);
        io.to(socket.id).emit('login', {user: data.id})
    } catch (error) {
        console.log(error);
        
    }
}