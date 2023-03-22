import { DataSource, DeleteResult, EntityManager, Repository } from "typeorm";
import { News } from "./news.entity";
import { CreateNewsDto, UpdateNewsDto } from "./dto";
import { NewsLanguageService } from "../news-language/news-language.service";
import { CategoryService } from "../category/category.service";
import { AdminService } from "../admin/admin.service";
import { fileService, images, telegram } from "../../infra/helpers";
import { Upload } from "../../infra/shared/interface";
import { HttpException } from "../../infra/validation";
import { State } from "../../infra/shared/enums";
import path = require("path");

const { CImage, CImage3 } = images;

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

  async updateStatePublished(
    ids: string[],
    state: string,
    tg: boolean,
    inst: boolean,
  ) {
    try {
      const imageDatas = [];
      for (let i = 0; i < ids.length; i++) {
        const id = ids[i];
        const news = await this.getById(id);
        const check = news?.ru ? true : false;
        const check2 = news?.ru.descImg ? true : false;

        if (tg) {
          if (check && news?.ru?.file) {
            await CImage({
              imgPath: news.ru.file,
              imgName: news.ru.file.split("/").at(-1),
              txt:
                news.ru.title.length > 102
                  ? news.ru.title.slice(0, 99) + "..."
                  : news.ru.title,
              ctgs: news.categories?.map((ctg) => ctg.ru),
            });

            imageDatas.push({
              name: "tg-image",
              path: path.resolve(
                __dirname,
                "../../infra/helpers/output",
                news.ru.file.split("/").at(-1),
              ),
            });

            await telegram({
              title: news.ru.title,
              desc: news.ru.shortDescription,
              link: "http://bright.getter.uz/news/" + news.id,
              imgDir: news.ru.file.split("/").at(-1),
            });
          }
        }
        if (inst) {
          if (check && check2) {
            const descImgs = news.ru?.descImg;
            if (descImgs.length > 0) {
              for (let i = 0; i < descImgs.length; i++) {
                const element = descImgs[i];
                CImage3({
                  imgName: element.split("/").at(-1),
                  imgPath: element,
                });
                imageDatas.push({
                  name: element.split("/").at(-1),
                  path: path.resolve(
                    __dirname,
                    "../../infra/helpers/output",
                    element.split("/").at(-1),
                  ),
                });
              }
            }
          }
        }
      }

      await this.newsRepository
        .createQueryBuilder()
        .update()
        .set({ state })
        .where("id IN(:...ids)", { ids })
        .execute();

      return imageDatas;
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }
}
