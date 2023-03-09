import { IsNotEmpty, IsString } from "class-validator";
import { News } from "../../news/news.entity";
import { NewsLanguageEnum } from "../../../infra/shared/enums";

class CreateLanguageDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  shortDescription: string;

  @IsNotEmpty()
  @IsString()
  shortLink: string;

  @IsNotEmpty()
  @IsString()
  file: string;
}

export default CreateLanguageDto;
