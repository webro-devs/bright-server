import { TypeOrmDataSource } from "../../config";

import { NewsService } from "./news.service";
import { News } from "./news.entity";

export const repository = TypeOrmDataSource.getRepository(News);

export const newsService = new NewsService(repository);
