import { TypeOrmDataSource } from "../../config";

import { CategoryService } from "./category.service";
import { Category } from "./category.entity";

export const repository = TypeOrmDataSource.getRepository(Category);

export const categoryService = new CategoryService(repository);
