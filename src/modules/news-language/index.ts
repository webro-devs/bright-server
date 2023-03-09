import { TypeOrmDataSource } from "../../config";

import { NewsLanguageService } from "./news-language.service";
import { NewsLanguage } from "./news-language.entity";

export const repository = TypeOrmDataSource.getRepository(NewsLanguage);

export const newsLanguageService = new NewsLanguageService(repository);
