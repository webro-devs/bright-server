import { UpdateResult, DeleteResult, Repository } from "typeorm";
import { News } from "./news.entity";
import { CreateNewsDto, UpdateNewsDto } from "./dto";
import { NewsLanguageService } from "../news-language/news-language.service";
import { CategoryService } from "../category/category.service";

export class NewsService {
  constructor(
    private readonly newsRepository: Repository<News>,
    private readonly newsLanguageService: NewsLanguageService,
    private readonly categoryService: CategoryService,
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

  async update(values: UpdateNewsDto, id: string): Promise<UpdateResult> {
    const response = await this.newsRepository.update(id, values);
    return response;
  }

  async remove(id: string): Promise<DeleteResult> {
    const response = await this.newsRepository.delete(id);
    return response;
  }

  async create(data: CreateNewsDto): Promise<News> {
    data.uz = await this.newsLanguageService.create(data.uz);
    data.ru = await this.newsLanguageService.create(data.ru);
    data.en = await this.newsLanguageService.create(data.en);
    data.уз = await this.newsLanguageService.create(data.уз);
    const categories = await this.categoryService.getManyCategoriesById(
      data.categories,
    );

    const news = this.newsRepository.create({ ...data, categories });
    return await this.newsRepository.save(news);
  }
}
