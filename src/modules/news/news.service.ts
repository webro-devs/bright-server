import { DataSource, DeleteResult, EntityManager, Repository } from "typeorm";
import slugify from "slugify";
import { News } from "./news.entity";
import { NewsLanguage } from "../news-language/news-language.entity";
import { CreateNewsDto, UpdateNewsDto } from "./dto";
import { NewsLanguageService } from "../news-language/news-language.service";
import { CategoryService } from "../category/category.service";
import { AdminService } from "../admin/admin.service";
import {
  fileService,
  telegram,
  SocialMediaService,
  deleteDirectory,
  CronJob,
} from "../../infra/helpers";
import { HttpException } from "../../infra/validation";
import { State } from "../../infra/shared/enums";
import { ChatService } from "../chat/chat.service";
// import { ElasticUpdate } from "./elastic-search";

export class NewsService {
  constructor(
    private readonly newsRepository: Repository<News>,
    private readonly newsLanguageService: NewsLanguageService,
    private readonly adminService: AdminService,
    private readonly categoryService: CategoryService,
    private readonly connection: DataSource,
    private readonly chatService: ChatService,
  ) {}

  async getAll(
    where,
    relations,
    pagination: { limit: number; offset: number },
  ): Promise<News[]> {
    try {
      const response = await this.newsRepository.find({
        order: {
          updated_at: "DESC",
        },
        where,
        relations,
        take: pagination.limit,
        skip: pagination.offset,
      });
      return response;
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  async getByState(
    state: State,
    relations,
    pagination: { limit: number; offset: number },
  ) {
    try {
      const data = await this.newsRepository.find({
        relations,
        where: { state },
        order: {
          updated_at: "DESC",
        },
        take: pagination.limit,
        skip: pagination.offset,
      });
      return data;
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  async getByStatePublished(
    where,
    relations,
    pagination: { limit: number; offset: number },
  ) {
    try {
      const data = await this.newsRepository.find({
        relations,
        where,
        order: {
          updated_at: "DESC",
        },
        take: pagination.limit,
        skip: pagination.offset,
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

  async getByIdForUpdateIndexing(id: string): Promise<News> {
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
          editors: {
            editor: {
              position: true,
            },
          },
          chat: true,
        },
      });
      return response;
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  async getOne(id: string, relations): Promise<News> {
    try {
      const response = await this.newsRepository.findOne({
        where: { id },
        relations,
      });
      return response;
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  async getLastNews(
    relations,
    where,
    pagination: { limit: number; offset: number },
  ): Promise<News[]> {
    try {
      const response = await this.newsRepository.find({
        where,
        relations,
        order: {
          updated_at: "DESC",
        },
        take: pagination.limit,
        skip: pagination.offset,
      });
      return response;
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  async getByCreatorId(
    where,
    relations,
    pagination: { limit: number; offset: number },
  ): Promise<News[]> {
    try {
      const response = await this.newsRepository.find({
        where,
        relations,
        order: {
          updated_at: "DESC",
        },
        take: pagination.limit,
        skip: pagination.offset,
      });
      return response;
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  async getBySavedCreator(
    id: string,
    state: string,
    relations,
    pagination: { limit: number; offset: number },
  ): Promise<News[]> {
    try {
      const response = await this.newsRepository.find({
        where: { creator: { id }, state },
        relations,
        order: {
          updated_at: "DESC",
        },
        take: pagination.limit,
        skip: pagination.offset,
      });
      return response;
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  async updateState(ids: string, state: string) {
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

  async update(values: UpdateNewsDto, id: string) {
    try {
      const languages = ["uz", "ru", "en", "уз"];
      const oldNews = await this.newsRepository.findOne({
        where: { id },
        relations: { categories: true, mainCategory: true },
      });
      const find = await this.getById(id);
      await Promise.all(
        languages?.map(async (key) => {
          if (values[key]) {
            if (values[key]?.shortLink) {
              values[key].shortLink = slugify(values[key].shortLink, {
                replacement: "-",
                remove: /[*+~.()'"!:@]/g,
                lower: true,
                strict: true,
                locale: "vi",
                trim: true,
              });
            }
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
      if (values?.file) {
        if (oldNews?.file && values.file != oldNews?.file) {
          await fileService.removeFile(oldNews.file);
        }
        oldNews.file = values.file;
      }
      if (
        values?.categories?.length > 0 ||
        values?.mainCategory ||
        values?.file
      ) {
        await this.connection.transaction(async (manager: EntityManager) => {
          await manager.save(oldNews);
        });
      } else {
        oldNews.updated_at = new Date();
        await this.connection.transaction(async (manager: EntityManager) => {
          await manager.save(oldNews);
        });
      }
      return new HttpException(false, 203, "successfully edited");
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
        creator: await this.adminService.getOnlyAdmin(id),
        state: data.state,
        categories: null,
        publishDate: data.publishDate,
        mainCategory: null,
        file: data.file || null,
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
      const result = await this.newsRepository.save(news);
      await this.chatService.create({ news: result.id });
      return result;
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
      deleteDirectory();
      const languages = ["ru", "uz", "en", "уз"];
      for (let i = 0; i < ids.length; i++) {
        const news = await this.getById(ids[i]);
        let publishDate = new Date(news.publishDate);
        let date = new Date();
        let diffTime = publishDate.getTime() - date.getTime() > 0;
        for (const lang of languages) {
          if (lang == "uz") {
            if (news?.[lang] && news?.file && (tg || inst)) {
              const imgDir = await SocialMediaService(
                news,
                `news_${i + 1}`,
                lang,
                true,
              );
              if (tg) {
                if (diffTime) {
                  CronJob(publishDate, async () => {
                    await telegram({
                      title: news[lang]?.title,
                      desc: news[lang]?.shortDescription,
                      link: "http://bright.getter.uz/news/" + news?.id,
                      imgDir,
                    });
                  });
                } else {
                  await telegram({
                    title: news[lang]?.title,
                    desc: news[lang]?.shortDescription,
                    link: "http://bright.getter.uz/news/" + news?.id,
                    imgDir,
                  });
                }
              }
              if (inst) {
                const descImgs = news[lang]?.descImg;
                if (descImgs?.length > 0) {
                  for (let j = 0; j < descImgs?.length; j++) {
                    const element = descImgs?.[j];
                    await SocialMediaService(
                      news,
                      `news_${i + 1}`,
                      lang,
                      false,
                      element,
                    );
                  }
                }
              }
            }
          }
        }
        if (diffTime) {
          CronJob(publishDate, async () => {
            await this.newsRepository
              .createQueryBuilder()
              .update()
              .set({ state })
              .where("id = :id", { id: news.id })
              .execute();

            // const newNews = await this.getByIdForUpdateIndexing(news.id);
            // await ElasticUpdate(newNews);
          });
        } else {
          await this.newsRepository
            .createQueryBuilder()
            .update()
            .set({ state })
            .where("id = :id", { id: news.id })
            .execute();

          // const newNews = await this.getByIdForUpdateIndexing(news.id);
          // await ElasticUpdate(newNews);
        }
      }

      return new HttpException(true, 203, "successfully edited");
    } catch (err) {
      return new HttpException(true, 500, err.message);
    }
  }

  async updateIsEditing(id: string, isEditing: boolean, updated_at: Date) {
    try {
      await this.newsRepository.update(id, { isEditing, updated_at });
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }
  // async getByShortLink(shortLink: string, key: string) {
  //   try {
  //     const response = await this.newsRepository.findOne({
  //       relations: {
  //         uz: true,
  //         ru: true,
  //         en: true,
  //         уз: true,
  //       },
  //       where: { uz: { shortLink } },
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
}
