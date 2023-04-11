import { TypeOrmDataSource } from "../../config";

import { ProjectLangService } from "./project-language.service";
import { ProjectLanguage } from "./project-language.entity";

export const repository = TypeOrmDataSource.getRepository(ProjectLanguage);

export const projectLangService = new ProjectLangService(repository);
