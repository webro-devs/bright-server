import { Repository } from "typeorm";
import { NewsLanguage } from "./news-language.entity";
import { CreateNewsLanguageDto, UpdateNewsLanguageDto } from "./dto";
import { HttpException } from "../../infra/validation";

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

  async getByShortLink(shortLink: string, relations): Promise<NewsLanguage> {
    const data = await this.languageRepository.findOne({
      where: { shortLink },
      relations,
    });
    return data;
  }
  // async getByShortLink(shortLink: string, key: string): Promise<NewsLanguage> {
  //   const response = await this.languageRepository.findOne({ include: [{
  //     model: NewsLanguage,
  //     where: { lang_id: languageId }
  //   }]})
  //     return response;
  //   }
  // }

  async create(values: CreateNewsLanguageDto) {
    const response = this.languageRepository.create(values);
    return await this.languageRepository.save(response);
  }

  async update(values: UpdateNewsLanguageDto, id: string) {
    try {
      const response = await this.languageRepository.update(id, values);
      return response;
    } catch (err) {
      return new HttpException(true, 500, err.message);
    }
  }

  async remove(id: string) {
    try {
      const response = await this.languageRepository.delete(id);
      return response;
    } catch (err) {
      return new HttpException(true, 500, err.message);
    }
  }

  async put(values: UpdateNewsLanguageDto, id: string) {
    try {
      await this.languageRepository
        .createQueryBuilder()
        .update()
        .set(values)
        .where("id = :id", { id })
        .execute();
    } catch (err) {
      return new HttpException(true, 500, err.message);
    }
  }
}
