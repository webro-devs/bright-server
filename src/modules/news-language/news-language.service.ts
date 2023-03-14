import { UpdateResult, DeleteResult, Repository } from "typeorm";
import { NewsLanguage } from "./news-language.entity";
import { CreateNewsLanguageDto, UpdateNewsLanguageDto } from "./dto";

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

  // async create(values: CreateNewsLanguageDto) {
  //   const response = this.languageRepository.create(values);
  //   return await this.languageRepository.save(response);
  // }

  async createMany(values: CreateNewsLanguageDto[]) {
    const response = this.languageRepository
      .createQueryBuilder()
      .insert()
      .into(NewsLanguage)
      .values(values as unknown as NewsLanguage)
      .returning("id")
      .execute();
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

  async put(values: UpdateNewsLanguageDto, id: string) {
    await this.languageRepository
      .createQueryBuilder()
      .update()
      .set(values)
      .where("id = :id", { id })
      .execute();
  }
}
