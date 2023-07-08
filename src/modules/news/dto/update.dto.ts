import {
  IsArray,
  IsBoolean,
  IsObject,
  IsOptional,
  IsString,
} from "class-validator";
import { State } from "../../../infra/shared/enums";
import { NewsLanguage } from "../../news-language/news-language.entity";

class UpdateNewsDto {
  @IsOptional()
  state: State;

  @IsOptional()
  imageForGenerate: string;

  @IsOptional()
  @IsString()
  publishDate: Date;

  @IsOptional()
  @IsArray()
  categories: string[];

  @IsOptional()
  @IsString()
  mainCategory: string;

  @IsOptional()
  @IsString()
  file: string;

  @IsOptional()
  @IsBoolean()
  isLastNews: boolean;

  @IsOptional()
  @IsObject()
  uz: NewsLanguage;

  @IsOptional()
  @IsObject()
  ru: NewsLanguage;

  @IsOptional()
  @IsObject()
  en: NewsLanguage;

  @IsOptional()
  @IsObject()
  уз: NewsLanguage;
}

export default UpdateNewsDto;
