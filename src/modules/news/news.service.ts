import { UpdateResult, DeleteResult, Repository } from "typeorm";
import { News } from "./news.entity";
import { CreateNewsDto, UpdateNewsDto } from "./dto";

export class NewsService {
  constructor(private readonly newsRepository: Repository<News>) {}

  async getAll(): Promise<News[]> {
    const response = await this.newsRepository.find();
    return response;
  }

  async getById(id: string): Promise<News> {
    const response = await this.newsRepository.findOne({ where: { id } });
    return response;
  }

  async create(values: CreateNewsDto): Promise<News> {
    const response = await this.newsRepository.create(values);
    return response;
  }

  async update(values: UpdateNewsDto, id: string): Promise<UpdateResult> {
    const response = await this.newsRepository.update(id, values);
    return response;
  }

  async remove(id: string): Promise<DeleteResult> {
    const response = await this.newsRepository.delete(id);
    return response;
  }
}
