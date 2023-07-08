import {
  IsString,
  IsOptional,
  IsObject,
  IsArray,
  IsBoolean,
} from "class-validator";
import { State } from "../../../infra/shared/enums";
import { NewsLanguage } from "../../news-language/news-language.entity";

class CreateNewsDto {
  @IsOptional()
  state: State;

  @IsOptional()
  imgForGener: string;

  @IsOptional()
  @IsString()
  publishDate: string;

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

export default CreateNewsDto;
