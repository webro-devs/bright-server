import { UpdateResult, DeleteResult, Repository } from "typeorm";
import { HttpException } from "../../infra/validation";
import { AboutProject } from "./about-project.entity";
import { ProjectLangService } from "../project-language/project-language.service";
import { CreateProjectDto, UpdateProjectDto } from "./dto";

export class ProjectService {
  constructor(
    private readonly projectRepository: Repository<AboutProject>,
    private readonly projectLanguageService: ProjectLangService,
  ) {}

  async create(data: CreateProjectDto): Promise<AboutProject> {
    try {
      const projectData = {
        uz: await this.projectLanguageService.create(data.uz),
        ru: await this.projectLanguageService.create(data.ru),
        en: await this.projectLanguageService.create(data.en),
        уз: await this.projectLanguageService.create(data.уз),
        image: data.image,
        links: data.links,
      };

      const project = this.projectRepository.create(projectData);
      const result = await this.projectRepository.save(project);
      return result;
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }
}
