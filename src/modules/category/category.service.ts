import { UpdateResult, DeleteResult, Repository } from "typeorm";
import slugify from "slugify";
import { HttpException } from "../../infra/validation";
import { Category } from "./category.entity";
import { CreateCategoryDto, UpdateCategoryDto } from "./dto";

export class CategoryService {
  constructor(private readonly categoryRepository: Repository<Category>) {}

  async getAll(): Promise<Category[]> {
    try {
      const categories = await this.categoryRepository.find();
      return categories;
    } catch (error) {
      throw new HttpException(true, 500, error.message);
    }
  }

  async getAllWithFiveNews(relations): Promise<Category[]> {
    try {
      const categories = await this.categoryRepository.find({
        relations,
      });
      categories.forEach((category) => {
        category.news = category.news.slice(0, 5);
      });
      return categories;
    } catch (error) {
      throw new HttpException(true, 500, error.message);
    }
  }

  async getById(id: string): Promise<Category> {
    try {
      const category = await this.categoryRepository.findOne({ where: { id } });
      return category;
    } catch (error) {
      throw new HttpException(true, 500, error.message);
    }
  }

  async create(values: CreateCategoryDto): Promise<Category> {
    try {
      const langs = ["uz", "ru", "en", "уз"];
      for (let i = 0; i < langs.length; i++) {
        values[langs[i] + "Slag"] = slugify(values[langs[i]], {
          replacement: "-",
          remove: /[*+~.()'"!:@]/g,
          lower: true,
          strict: true,
          locale: "vi",
          trim: true,
        });
      }

      const response = this.categoryRepository.create(values);
      return this.categoryRepository.save(response);
    } catch (error) {
      throw new HttpException(true, 500, error.message);
    }
  }

  async update(values: UpdateCategoryDto, id: string): Promise<UpdateResult> {
    try {
      const langs = ["uz", "ru", "en", "уз"];
      for (let i = 0; i < langs.length; i++) {
        values[langs[i] + "Slag"] = slugify(values[langs[i]], {
          replacement: "-",
          remove: /[*+~.()'"!:@]/g,
          lower: true,
          strict: true,
          locale: "vi",
          trim: true,
        });
      }

      const response = await this.categoryRepository.update(id, values);
      return response;
    } catch (error) {
      throw new HttpException(true, 500, error.message);
    }
  }

  async remove(id: string): Promise<DeleteResult> {
    try {
      const response = await this.categoryRepository.delete(id);
      return response;
    } catch (error) {
      throw new HttpException(true, 500, error.message);
    }
  }

  async getManyCategoriesById(ids: string[]): Promise<Category[]> {
    try {
      return ids?.length > 0
        ? this.categoryRepository
            .createQueryBuilder()
            .where("id IN(:...ids)", { ids })
            .getMany()
        : [];
    } catch (error) {
      throw new HttpException(true, 500, error.message);
    }
  }

  async getCategoryByName(key: string, data: string): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { [key]: data },
      relations: {
        news: {
          [key]: true,
        },
      },
    });
    return category;
  }
}
