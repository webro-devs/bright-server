import { UpdateResult, DeleteResult, Repository } from "typeorm";
import { Position } from "./position.entity";
import { CreatPositionDto, UpdatePositionDto } from "./dto";

export class PositionService {
  constructor(private readonly positionRepository: Repository<Position>) {}

  async getAll(): Promise<Position[]> {
    const positions = await this.positionRepository.find();
    return positions;
  }

  async create(values: CreatPositionDto): Promise<Position> {
    const response = this.positionRepository.create(values);
    return this.positionRepository.save(response);
  }

  async update(values: UpdatePositionDto, id: string): Promise<UpdateResult> {
    const response = await this.positionRepository.update(id, values);
    return response;
  }

  async remove(id: string): Promise<DeleteResult> {
    const response = await this.positionRepository.delete(id);
    return response;
  }
}
