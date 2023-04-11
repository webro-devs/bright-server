import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { ProjectLanguage } from "../../project-language/project-language.entity";

class UpdateProjectDto {
  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsArray()
  links: string[];

  @IsNotEmpty()
  @IsString()
  uz: ProjectLanguage;

  @IsNotEmpty()
  @IsString()
  en: ProjectLanguage;

  @IsNotEmpty()
  @IsString()
  ru: ProjectLanguage;

  @IsNotEmpty()
  @IsString()
  уз: ProjectLanguage;
}

export default UpdateProjectDto;
