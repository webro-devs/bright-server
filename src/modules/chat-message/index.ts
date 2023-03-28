import { TypeOrmDataSource } from "../../config";

import { MessageService } from "./chat-message.service";
import { chatMessage } from "./chat-message.entity";

export const repository = TypeOrmDataSource.getRepository(chatMessage);

export const messageService = new MessageService(repository);
