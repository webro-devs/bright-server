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
      const response = await this.messageRepository.findOne({ where: { id } });
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
      console.log(new HttpException(true, 500, err.message));
    }
  }

  async update(body: string, id: string): Promise<UpdateResult> {
    try {
      const edit = await this.messageRepository
        .createQueryBuilder()
        .update()
        .set({ body })
        .where("id = :id", { id })
        .execute();
      return edit;
    } catch (err) {
      console.log(new HttpException(true, 500, err.message));
    }
  }

  async remove(id: string): Promise<DeleteResult> {
    try {
      const response = await this.messageRepository.delete(id);
      return response;
    } catch (err) {
      console.log(new HttpException(true, 500, err.message));
    }
  }
}
