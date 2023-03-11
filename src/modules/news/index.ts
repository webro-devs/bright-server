import { TypeOrmDataSource } from "../../config";

import { NewsService } from "./news.service";
import { News } from "./news.entity";
import { newsLanguageService } from "../news-language";
import { categoryService } from "../category";

export const repository = TypeOrmDataSource.getRepository(News);

export const newsService = new NewsService(
  repository,
  newsLanguageService,
  categoryService,
);
