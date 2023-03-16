import { DeleteResult, Repository } from "typeorm";
import { News } from "./news.entity";
import { CreateNewsDto, UpdateNewsDto } from "./dto";
import { NewsLanguageService } from "../news-language/news-language.service";
import { CategoryService } from "../category/category.service";
import { AdminService } from "../admin/admin.service";
import { fileService } from "../../infra/helpers";
import { Upload } from "../../infra/shared/interface";
import { HttpException } from "../../infra/validation";
import { State } from "../../infra/shared/enums";

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
        categories: true,
      },
    });
    return response;
  }

  async getByState(state: State) {
    const data = await this.newsRepository.find({
      where: { state },
      relations: {
        creator: true,
        uz: true,
        ru: true,
        en: true,
        уз: true,
        categories: true,
      },
    });
    return data;
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

  async updateState(id: string, state: string) {
    await this.newsRepository
      .createQueryBuilder()
      .update()
      .set({ state })
      .where("id = :id", { id })
      .execute();

    return "State successfully changed";
  }

  async updateDate(id: string, date: string) {
    await this.newsRepository
      .createQueryBuilder()
      .update()
      .set({ publishDate: date })
      .where("id = :id", { id })
      .execute();
  }

  async update(values: UpdateNewsDto, id: string, imgs: Upload) {
    const languages = ["uz", "ru", "en", "уз"];

    const find = await this.getById(id);
    await Promise.all(
      languages?.map(async (key) => {
        if (values[key]) {
          if (imgs && imgs?.[key + "_img"]) {
            if (find[key].file) {
              await fileService.removeFile(find[key].file);
            }
            const img = await fileService.uploadImage(imgs[key + "_img"]);
            if (img.error) {
              return new HttpException(true, 500, "image upload error");
            }
            values[key].file = img.url;
          }
          await this.newsLanguageService.put({ ...values[key] }, find[key].id);
        }
      }),
    );
    return "succesfully edited";
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
    if (data?.categories?.length > 0) {
      const categories = await this.categoryService.getManyCategoriesById(
        data.categories,
      );
      newsData.categories = categories;
    }

    const news = this.newsRepository.create(newsData);
    return await this.newsRepository.save(news);
  }
}
