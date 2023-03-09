import { UpdateResult, DeleteResult, Repository } from "typeorm";
import { News } from "./news.entity";
import { CreateNewsDto, UpdateNewsDto } from "./dto";
import { NewsLanguageService } from "../news-language/news-language.service";

export class NewsService {
  constructor(
    private readonly newsRepository: Repository<News>,
    private readonly newsLanguageService: NewsLanguageService,
  ) {}

  async getAll(): Promise<News[]> {
    const response = await this.newsRepository.find({
      relations: {
        uz: true,
      },
    });
    return response;
  }

  async getById(id: string): Promise<News> {
    const response = await this.newsRepository.findOne({ where: { id } });
    return response;
  }

  async create(values: CreateNewsDto) {
    const response = await this.newsRepository
      .createQueryBuilder()
      .insert()
      .into(News)
      .values(values)
      .execute();

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
