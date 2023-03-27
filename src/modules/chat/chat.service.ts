import { DeleteResult, Repository } from "typeorm";
import { Chat } from "./chat.entity";
import { CreateChatDto } from "./dto";

export class ChatService {
  constructor(private readonly chatRepository: Repository<Chat>) {}

  async getAll(): Promise<Chat[]> {
    const getAll = await this.chatRepository.find({
      relations: {
        messages: {
          user: {
            position: true,
          },
        },
      },
    });
    return getAll;
  }

  async getById(id: string): Promise<Chat> {
    const response = await this.chatRepository.findOne({ where: { id } });
    return response;
  }

  async create(values: CreateChatDto) {
    const response = this.chatRepository.createQueryBuilder()
    .insert()
    .into(Chat)
    .values(values as unknown as Chat)
    .execute()
    return response
  }

  async remove(id: string): Promise<DeleteResult> {
    const response = await this.chatRepository.delete(id);
    return response;
  }
}
