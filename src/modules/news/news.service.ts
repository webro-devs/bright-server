import { UpdateResult, DeleteResult, Repository } from "typeorm";
import { News } from "./news.entity";
import { CreateNewsDto, UpdateNewsDto } from "./dto";
import { NewsLanguageService } from "../news-language/news-language.service";
import { CategoryService } from "../category/category.service";
import { AdminService } from "../admin/admin.service";
import { Admin } from "../admin/admin.entity";

export class NewsService {
  constructor(
    private readonly newsRepository: Repository<News>,
    private readonly newsLanguageService: NewsLanguageService,
    private readonly adminService: AdminService,
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
    const response = await this.newsRepository.findOne({
      where: { id },
      relations: {
        uz: true,
        ru: true,
        en: true,
        уз: true,
        categories: true,
      },
    });
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

  async create(data: CreateNewsDto, id: string): Promise<News> {
    const newsData = {
      uz: await this.newsLanguageService.create(data.uz),
      ru: await this.newsLanguageService.create(data.ru),
      en: await this.newsLanguageService.create(data.en),
      уз: await this.newsLanguageService.create(data.уз),
      creator: await this.adminService.getById(id),
      state: data.state,
      categories: null,
      publishDate: data.publishDate,
    };
    if (data?.categories.length > 0) {
      const categories = await this.categoryService.getManyCategoriesById(
        data.categories,
      );
      newsData.categories = categories;
    }

    const news = this.newsRepository.create(newsData);
    return await this.newsRepository.save(news);
  }
}
