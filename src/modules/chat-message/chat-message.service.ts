import { UpdateResult, DeleteResult, Repository } from "typeorm";
import { HttpException } from "../../infra/validation";
import { chatMessage } from "./chat-message.entity";
import { CreateMessageDto } from "./dto";

export class MessageService {
  constructor(private readonly messageRepository: Repository<chatMessage>) {}

  async getAll(): Promise<chatMessage[]> {
    try {
      const getAll = await this.messageRepository.find({
        relations: {
          user: true,
        },
      });
      return getAll;
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  async getById(id: string): Promise<chatMessage> {
    try {
      const response = await this.messageRepository.findOne({
        where: { id },
        relations: { user: true },
      });
      return response;
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  async create(values: CreateMessageDto): Promise<chatMessage> {
    try {
      const response = this.messageRepository.create(values);
      return await this.messageRepository.save(response);
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  async update(
    body: string,
    id: string,
    user_id: string,
  ): Promise<UpdateResult> {
    try {
      const data = await this.getById(id);
      if (data.user.id == user_id) {
        const edit = await this.messageRepository
          .createQueryBuilder()
          .update()
          .set({ body })
          .where("id = :id", { id })
          .execute();
        return edit;
      } else {
        throw new HttpException(true, 500, "This is not your message");
      }
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  async remove(id: string, user_id: string): Promise<DeleteResult> {
    try {
      const data = await this.getById(id);
      if (data.user.id != user_id) return;
      const response = await this.messageRepository.delete(id);
      return response;
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }
}
