import { DeleteResult, Repository } from "typeorm";
import { HttpException } from "../../infra/validation";
import { Chat } from "./chat.entity";
import { CreateChatDto } from "./dto";

export class ChatService {
  constructor(private readonly chatRepository: Repository<Chat>) {}

  async getAll(): Promise<Chat[]> {
    try {
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
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  async getById(id: string): Promise<Chat> {
    try {
      const response = await this.chatRepository.findOne({
        where: { news: { id } },
        relations: {
          messages: {
            user: {
              position: true,
            },
          },
        },
        select: {
          id: true,
          messages: {
            id: true,
            body: true,
            date: true,
            user: {
              id: true,
              avatar: true,
              fullName: true,
              isOnline: true,
              position: {
                id: true,
                title: true,
              },
            },
          },
        },
        order: {
          messages: { date: "ASC" },
        },
      });
      return response;
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  async create(values: CreateChatDto) {
    try {
      const response = this.chatRepository
        .createQueryBuilder()
        .insert()
        .into(Chat)
        .values(values as unknown as Chat)
        .execute();
      return response;
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  async remove(id: string): Promise<DeleteResult> {
    try {
      const response = await this.chatRepository.delete(id);
      return response;
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }
}
