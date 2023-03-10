import { UpdateResult, DeleteResult, Repository } from "typeorm";
import { NewsLanguage } from "./news-language.entity";
import { CreateNewsLanguageDto, UpdateNewsLanguageDto } from "./dto";
import { CreateNewsDto } from "../news/dto";
import { News } from "../news/news.entity";

export class NewsLanguageService {
  constructor(private readonly languageRepository: Repository<NewsLanguage>) {}

  async getAll(): Promise<NewsLanguage[]> {
    const response = await this.languageRepository.find();
    return response;
  }

  async getById(id: string): Promise<NewsLanguage> {
    const response = await this.languageRepository.findOne({ where: { id } });
    return response;
  }

  async create(values: CreateNewsLanguageDto) {
    const response = this.languageRepository.create(values);
    return await this.languageRepository.save(response);
  }

  async update(
    values: UpdateNewsLanguageDto,
    id: string,
  ): Promise<UpdateResult> {
    const response = await this.languageRepository.update(id, values);
    return response;
  }

  async remove(id: string): Promise<DeleteResult> {
    const response = await this.languageRepository.delete(id);
    return response;
  }
}
