import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { News } from "../../news/news.entity";

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

  @IsNotEmpty()
  @IsArray()
  tags: string[];

  @IsOptional()
  @IsString()
  uz: News;

  @IsOptional()
  @IsString()
  ru: News;

  @IsOptional()
  @IsString()
  en: News;

  @IsOptional()
  @IsString()
  уз: News;
}

export default CreateLanguageDto;
