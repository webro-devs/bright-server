import {
  UpdateResult,
  DeleteResult,
  Repository,
  DataSource,
  EntityManager,
} from "typeorm";
import { News } from "./news.entity";
import { CreateNewsDto, UpdateNewsDto } from "./dto";
import { NewsLanguageService } from "../news-language/news-language.service";
import { CategoryService } from "../category/category.service";
import { AdminService } from "../admin/admin.service";
import { fileService } from "../../infra/helpers";
import { CreateNewsLanguageDto } from "../news-language/dto";

export class NewsService {
  constructor(
    private readonly newsRepository: Repository<News>,
    private readonly newsLanguageService: NewsLanguageService,
    private readonly adminService: AdminService,
    private readonly categoryService: CategoryService,
    private readonly connection: DataSource,
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

  async update(values: UpdateNewsDto, id: string) {
    const languages = ["uz", "ru", "en", "уз"];
    const arr = [];

    const find = await this.getById(id);
    await Promise.all(
      languages?.map(async (key) => {
        if (values[key]) {
          if (find[key]) {
            await this.newsLanguageService.put(
              { ...values[key] },
              find[key].id,
            );
          }
        }
      }),
    );

    return find;
  }

  async remove(id: string): Promise<DeleteResult> {
    const response = await this.newsRepository.delete(id);
    return response;
  }

  async create(data: CreateNewsDto, files, creatorId: string) {
    const news = new News();
    let uzFile, ruFile, enFile, узFile;
    if (files?.uzFile) {
      uzFile = await fileService.uploadImage(files.uzFile);
      console.log(uzFile);
    } else {
      uzFile = null;
    }
    if (files?.ruFile) {
      ruFile = await fileService.uploadImage(files.ruFile);
      console.log(ruFile);
    } else {
      ruFile = null;
    }
    if (files?.enFile) {
      enFile = await fileService.uploadImage(files.enFile);
      console.log(enFile);
    } else {
      enFile = null;
    }
    if (files?.узFile) {
      узFile = await fileService.uploadImage(files.узFile);
      console.log(узFile);
    } else {
      узFile = null;
    }
    const uz = data.uz
      ? { ...data.uz, uz: news.id, file: uzFile }
      : { file: uzFile, uz: news.id };
    const ru = data.uz
      ? { ...data.ru, ru: news.id, file: ruFile }
      : { file: ruFile, ru: news.id };
    const en = data.uz
      ? { ...data.en, en: news.id, file: enFile }
      : { file: enFile, en: news.id };
    const уз = data.uz
      ? { ...data.уз, уз: news.id, file: узFile }
      : { file: узFile, уз: news.id };
    await this.newsLanguageService.createMany([
      uz,
      ru,
      en,
      уз,
    ] as unknown as CreateNewsLanguageDto[]);
    const creator = await this.adminService.getById(creatorId);
    const categories = await this.categoryService.getManyCategoriesById(
      data.categories,
    );
    news.creator = creator;
    news.categories = categories;
    news.state = data.state;
    await this.connection.transaction(async (manager: EntityManager) => {
      await manager.save(news);
    });
    return news;
  }
}
