import { OnJoinType } from "./types/user.types";
import { socketService } from "./socket.module";

// const Service = new NotificationService()

export const OnJoin = async (data: OnJoinType, socket: any, io: any) => {
    try {
        console.log(`User id: ${data.id} ==== Socket id: ${socket.id}`);
        await socketService.create({socketId: socket.id, admin: data?.id})
    } catch (error) {
        console.log(error);
    }
}

export const OnDisconnect = async () => {
    try {
        
    } catch (error) {
        console.log(error);
        
    }
}