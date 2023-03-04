import { UpdateResult, DeleteResult, Repository } from "typeorm";
import { NewsLanguage } from "./index.entity";
import { CreateNewsLanguageDto, UpdateNewsLanguageDto } from "./dto";

export class CategoryService {
  constructor(private readonly languageRepository: Repository<NewsLanguage>) {}

  async getAll(): Promise<NewsLanguage[]> {
    const categories = await this.languageRepository.find();
    return categories;
  }

  async getById(id: string): Promise<NewsLanguage> {
    const category = await this.languageRepository.findOne({ where: { id } });
    return category;
  }

  async create(values: CreateNewsLanguageDto): Promise<NewsLanguage> {
    const response = await this.languageRepository.create(values);
    return response;
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
