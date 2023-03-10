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
        ru: true,
        en: true,
        уз: true,
      },
    });
    return response;
  }

  async getById(id: string): Promise<News> {
    const response = await this.newsRepository.findOne({ where: { id } });
    return response;
  }

  async create(values: CreateNewsDto, creator: string) {
    console.log(values);
    console.log("jjj");

    const uz = await this.newsLanguageService.create({
      ...values.uz,
    });
    const ru = await this.newsLanguageService.create({
      ...values.ru,
    });
    const en = await this.newsLanguageService.create({
      ...values.en,
    });
    const уз = await this.newsLanguageService.create({
      ...values.уз,
    });
    values.en = en;
    values.ru = ru;
    values.uz = uz;
    values.уз = уз;
    const response = this.newsRepository.create(values);

    return await this.newsRepository.save(response);
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
