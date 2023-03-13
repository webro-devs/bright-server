import { UpdateResult, DeleteResult, Repository } from "typeorm";
import { Category } from "./category.entity";
import { CreateCategoryDto, UpdateCategoryDto } from "./dto";

export class CategoryService {
  constructor(private readonly categoryRepository: Repository<Category>) {}

  async getAll(): Promise<Category[]> {
    const categories = await this.categoryRepository.find();
    return categories;
  }

  async getById(id: string): Promise<Category> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    return category;
  }

  async create(values: CreateCategoryDto): Promise<Category> {
    const response = this.categoryRepository.create(values);
    return this.categoryRepository.save(response);
  }

  async update(values: UpdateCategoryDto, id: string): Promise<UpdateResult> {
    const response = await this.categoryRepository.update(id, values);
    return response;
  }

  async remove(id: string): Promise<DeleteResult> {
    const response = await this.categoryRepository.delete(id);
    return response;
  }

  async getManyCategoriesById(ids: string[]): Promise<Category[]> {
    return ids?.length > 0
      ? this.categoryRepository
          .createQueryBuilder()
          .where("id IN(:...ids)", { ids })
          .getMany()
      : [];
  }
}
