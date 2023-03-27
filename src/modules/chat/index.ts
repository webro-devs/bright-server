import { TypeOrmDataSource } from "../../config";

import { ChatService } from "./chat.service";
import { Chat } from "./chat.entity";

export const repository = TypeOrmDataSource.getRepository(Chat);

export const chatService = new ChatService(repository);
