import { UpdateResult, DeleteResult, Repository } from "typeorm";
import { Position } from "./position.entity";
import { CreatePositionDto, UpdatePositionDto } from "./dto";
import { HttpException } from "../../infra/validation";

export class PositionService {
  constructor(private readonly positionRepository: Repository<Position>) {}

  async getAll(): Promise<Position[]> {
    try {
      const positions = await this.positionRepository.find();
      return positions;
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  async getById(id: string): Promise<Position> {
    try {
      const positions = await this.positionRepository.findOne({
        where: { id },
        relations: {
          admins: true,
        },
      });
      return positions;
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  async create(values: CreatePositionDto): Promise<Position> {
    try {
      const response = this.positionRepository.create(values);
      return await this.positionRepository.save(response);
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  async update(values: UpdatePositionDto, id: string): Promise<UpdateResult> {
    try {
      const response = await this.positionRepository.update(id, values);
      return response;
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  async remove(id: string): Promise<DeleteResult> {
    try {
      const response = await this.positionRepository.delete(id);
      return response;
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }
}
