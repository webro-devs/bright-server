import { DeleteResult, Repository } from "typeorm";
import { SocketEntity } from "./socket.entity";
import { HttpException } from "../../infra/validation";

export class SocketService {
  constructor(private readonly socketRepository: Repository<SocketEntity>) {}

  async getBySocketId(socketId: string): Promise<SocketEntity> {
    try {
      const category = await this.socketRepository.findOne({
        where: { socketId },
      });
      return category;
    } catch (error) {
      throw new HttpException(true, 500, error.message);
    }
  }

  async create(values: { socketId: string; admin: string }) {
    try {
      const response = await this.socketRepository
        .createQueryBuilder()
        .insert()
        .into(SocketEntity)
        .values(values as unknown as SocketEntity)
        .execute();
      return response;
    } catch (error) {
      throw new HttpException(true, 500, error.message);
    }
  }

  async removeBySocketId(id: string): Promise<DeleteResult | HttpException> {
    try {
      const response = await this.socketRepository.delete({ socketId: id });
      return new HttpException(false, 204, "Socket id and admin id removed!");
    } catch (error) {
      return new HttpException(true, 500, error.message);
    }
  }
}
