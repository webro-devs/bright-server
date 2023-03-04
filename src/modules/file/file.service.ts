import { UpdateResult, DeleteResult, Repository } from "typeorm";
import { File } from "./file.entity";
import { CreatFileDto, UpdateFileDto } from "./dto";

export class FileService {
  constructor(private readonly fileRepository: Repository<File>) {}

  async getAll(): Promise<File[]> {
    const files = await this.fileRepository.find();
    return files;
  }

  async create(values: CreatFileDto): Promise<File> {
    const response = await this.fileRepository.create(values);
    return response;
  }

  async update(values: UpdateFileDto, id: string): Promise<UpdateResult> {
    const response = await this.fileRepository.update(id, values);
    return response;
  }

  async remove(id: string): Promise<DeleteResult> {
    const response = await this.fileRepository.delete(id);
    return response;
  }
}
