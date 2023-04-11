import { TypeOrmDataSource } from "../../config";

import { ProjectService } from "./about-project.service";
import { AboutProject } from "./about-project.entity";
import { projectLangService } from "../project-language";

export const repository = TypeOrmDataSource.getRepository(AboutProject);

export const projectService = new ProjectService(
  repository,
  projectLangService,
);
