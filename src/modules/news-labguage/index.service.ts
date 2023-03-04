import { UpdateResult, DeleteResult, Repository } from "typeorm";
import { newsLanguage } from "./index.entity";
import { CreateLanguageDto, UpdateLanguageDto } from "./dto";

export class CategoryService {
  constructor(private readonly languageRepository: Repository<newsLanguage>) {}

  async getAll(): Promise<newsLanguage[]> {
    const categories = await this.languageRepository.find();
    return categories;
  }

  async getById(id: string): Promise<newsLanguage> {
    const category = await this.languageRepository.findOne({ where: { id } });
    return category;
  }

  async create(values: CreateLanguageDto): Promise<newsLanguage> {
    const response = await this.languageRepository.create(values);
    return response;
  }

  async update(values: UpdateLanguageDto, id: string): Promise<UpdateResult> {
    const response = await this.languageRepository.update(id, values);
    return response;
  }

  async remove(id: string): Promise<DeleteResult> {
    const response = await this.languageRepository.delete(id);
    return response;
  }
}
