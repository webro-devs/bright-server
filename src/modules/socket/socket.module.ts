import { TypeOrmDataSource } from "../../config";

import { SocketService } from "./socket.service";
import { SocketEntity } from "./socket.entity";

export const repository = TypeOrmDataSource.getRepository(SocketEntity);

export const socketService = new SocketService(repository);