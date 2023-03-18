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
    try {
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
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  async updateState(id: string, state: string) {
    try {
      await this.newsRepository
        .createQueryBuilder()
        .update()
        .set({ state })
        .where("id = :id", { id })
        .execute();

      return new HttpException(false, 203, "State successfully changed");
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  async updateStatePublished(ids: string[], state: string) {
    try {
      await this.newsRepository
        .createQueryBuilder()
        .update()
        .set({ state })
        .where("id IN(:...ids)", { ids })
        .execute();

      return new HttpException(false, 203, "State successfully changed");
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  async updateFavorite(id: string, state: State.favorites, creator: string) {
    try {
      const news = await this.newsRepository.findOne({
        where: { id },
        relations: { creator: true },
      });
      if (news.creator.id != creator) {
        return new HttpException(true, 403, "You can't make it your favorite");
      }
      await this.newsRepository.update(id, { state });
      return new HttpException(true, 203, "State successfully changed");
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  async updateDate(id: string, date: string) {
    try {
      await this.newsRepository
        .createQueryBuilder()
        .update()
        .set({ publishDate: date })
        .where("id = :id", { id })
        .execute();
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  async update(values: UpdateNewsDto, id: string, imgs: Upload) {
    try {
      const languages = ["uz", "ru", "en", "уз"];

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
      if (values.categories.length > 0) {
        const categories = await this.categoryService.getManyCategoriesById(
          values.categories,
        );
        const oldNews = await this.newsRepository.findOne({
          where: { id },
          relations: { categories: true },
        });
        oldNews.categories = categories;

        await this.connection.transaction(async (manager: EntityManager) => {
          await manager.save(oldNews);
        });
      }
      return new HttpException(true, 203, "succesfully edited");
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  async remove(id: string): Promise<DeleteResult | HttpException> {
    try {
      const response = await this.newsRepository.delete(id);
      return new HttpException(false, 204, "Deleted succesfully");
    } catch (err) {
      throw new HttpException(true, 204, err.message);
    }
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
      };
      if (data?.categories?.length > 0) {
        const categories = await this.categoryService.getManyCategoriesById(
          data.categories,
        );
        newsData.categories = categories;
      }

      const news = this.newsRepository.create(newsData);
      return await this.newsRepository.save(news);
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }
}
