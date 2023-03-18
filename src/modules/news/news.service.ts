import { DataSource, DeleteResult, EntityManager, Repository } from "typeorm";
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
    private readonly connection: DataSource,
  ) {}

  async getAll({ where }): Promise<News[]> {
    try {
      const response = await this.newsRepository.find({
        relations: {
          uz: true,
          ru: true,
          en: true,
          уз: true,
          categories: true,
          creator: true,
          mainCategory: true,
        },
        order: {
          created_at: "DESC",
        },
        where,
      });
      return response;
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  async getByState(state: State) {
    try {
      const data = await this.newsRepository.find({
        relations: {
          creator: true,
          uz: true,
          ru: true,
          en: true,
          уз: true,
          categories: true,
          mainCategory: true,
        },
        where: { state },
      });
      return data;
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  async getByStatePublished(where) {
    try {
      const data = await this.newsRepository.find({
        relations: {
          creator: true,
          uz: true,
          ru: true,
          en: true,
          уз: true,
          categories: true,
          mainCategory: true,
        },
        where,
      });
      return data;
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  async getById(id: string): Promise<News> {
    try {
      const response = await this.newsRepository.findOne({
        where: { id },
        relations: {
          uz: true,
          ru: true,
          en: true,
          уз: true,
          categories: true,
          creator: true,
          mainCategory: true,
        },
      });
      return response;
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  async getByCreatorId(where): Promise<News[]> {
    try {
      const response = await this.newsRepository.find({
        where,
        relations: {
          uz: true,
          ru: true,
          en: true,
          уз: true,
          categories: true,
          creator: true,
        },
        order: {
          created_at: "DESC",
        },
      });
      return response;
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  async getBySavedCreator(id: string, state: string): Promise<News[]> {
    const response = await this.newsRepository.find({
      where: { creator: { id }, state },
      relations: {
        uz: true,
        ru: true,
        en: true,
        уз: true,
        categories: true,
        creator: true,
      },
      order: {
        created_at: "DESC",
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

  async updateStatePublished(ids: string[], state: string) {
    await this.newsRepository
      .createQueryBuilder()
      .update()
      .set({ state })
      .where("id IN(:...ids)", { ids })
      .execute();

    return "State successfully changed";
  }

  async updateFavorite(id: string, state: State.favorites, creator: string) {
    const news = await this.newsRepository.findOne({
      where: { id },
      relations: { creator: true },
    });
    if (news.creator.id != creator) {
      return new HttpException(true, 403, "You can't make it your favorite");
    }
    await this.newsRepository.update(id, { state });
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
    try {
      const languages = ["uz", "ru", "en", "уз"];
      const oldNews = await this.newsRepository.findOne({
        where: { id },
        relations: { categories: true, mainCategory: true },
      });
      const find = await this.getById(id);
      await Promise.all(
        languages?.map(async (key) => {
          if (values[key] && !imgs?.[key + "_img"]) {
            await this.newsLanguageService.put(
              { ...values[key] },
              find[key].id,
            );
          }
          if (imgs && imgs?.[key + "_img"]) {
            if (find[key].file) {
              await fileService.removeFile(find[key].file);
            }
            const img = await fileService.uploadImage(imgs[key + "_img"]);
            if (img.error) {
              return new HttpException(true, 500, "image upload error");
            }
            values[key] = values[key] ? values[key] : {};
            values[key].file = img.url;
            await this.newsLanguageService.put(
              { ...values[key] },
              find[key].id,
            );
          }
        }),
      );
      if (values?.categories?.length > 0) {
        const categories = await this.categoryService.getManyCategoriesById(
          values.categories,
        );
        oldNews.categories = categories;
      }
      if (values?.mainCategory) {
        const mainCategory = await this.categoryService.getById(
          values.mainCategory,
        );
        oldNews.mainCategory = mainCategory;
      }
      if (values?.categories?.length > 0 || values?.mainCategory) {
        await this.connection.transaction(async (manager: EntityManager) => {
          await manager.save(oldNews);
        });
      }
      return "succesfully edited";
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  async remove(id: string): Promise<DeleteResult> {
    const response = await this.newsRepository.delete(id);
    return response;
  }

  async create(data: CreateNewsDto, id: string): Promise<News> {
    try {
      const newsData = {
        uz: await this.newsLanguageService.create(data.uz),
        ru: await this.newsLanguageService.create(data.ru),
        en: await this.newsLanguageService.create(data.en),
        уз: await this.newsLanguageService.create(data.уз),
        creator: await this.adminService.getById(id),
        state: data.state,
        categories: null,
        publishDate: data.publishDate,
        mainCategory: null,
      };
      if (data?.categories?.length > 0) {
        const categories = await this.categoryService.getManyCategoriesById(
          data.categories,
        );
        newsData.categories = categories;
      }
      if (data?.mainCategory) {
        const mainCategory = await this.categoryService.getById(
          data.mainCategory,
        );
        newsData.mainCategory = mainCategory;
      }

      const news = this.newsRepository.create(newsData);
      return await this.newsRepository.save(news);
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }
}
