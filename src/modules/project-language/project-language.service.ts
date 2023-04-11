import { Repository } from "typeorm";
import { ProjectLanguage } from "./project-language.entity";
import { CreateProjectLangDto, UpdateProjectLangDto } from "./dto";
import { HttpException } from "../../infra/validation";

export class ProjectLangService {
  constructor(
    private readonly projectLangRepository: Repository<ProjectLanguage>,
  ) {}

  async create(values: CreateProjectLangDto) {
    const response = this.projectLangRepository.create(values);
    return await this.projectLangRepository.save(response);
  }

  async update(values: UpdateProjectLangDto, id: string) {
    try {
      const response = await this.projectLangRepository.update(id, values);
      return response;
    } catch (err) {
      return new HttpException(true, 500, err.message);
    }
  }

  async remove(id: string) {
    try {
      const response = await this.projectLangRepository.delete(id);
      return response;
    } catch (err) {
      return new HttpException(true, 500, err.message);
    }
  }
}
