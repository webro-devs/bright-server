import { UpdateResult, DeleteResult, Repository } from "typeorm";
import { chatMessage } from "./chat-message.entity";
import { CreateMessageDto } from "./dto";

export class MessageService {
  constructor(private readonly messageRepository: Repository<chatMessage>) {}

  async getAll(): Promise<chatMessage[]> {
    const getAll = await this.messageRepository.find({
      relations: {
        user: true,
      },
    });
    return getAll;
  }

  async getById(id: string): Promise<chatMessage> {
    const response = await this.messageRepository.findOne({ where: { id } });
    return response;
  }

  async create(values: CreateMessageDto): Promise<chatMessage> {
    const response = this.messageRepository.create(values);
    return await this.messageRepository.save(response);
  }

  async update(body: string, id: string): Promise<UpdateResult> {
    const edit = await this.messageRepository
      .createQueryBuilder()
      .update()
      .set({ body })
      .where("id = :id", { id })
      .execute();

    return edit;
  }

  async remove(id: string): Promise<DeleteResult> {
    const response = await this.messageRepository.delete(id);
    return response;
  }
}
