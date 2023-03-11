import {
  IsArray,
  IsNotEmpty,
  IsString,
  IsObject,
  IsOptional,
} from "class-validator";
import { State } from "../../../infra/shared/enums";
import { NewsLanguage } from "../../news-language/news-language.entity";
import { Admin } from "../../admin/admin.entity";

class CreateNewsDto {
  @IsOptional()
  @IsArray()
  state: State;

  @IsNotEmpty()
  @IsArray()
  creator: Admin;

  @IsNotEmpty()
  @IsString()
  publishDate: string;

  @IsNotEmpty()
  @IsArray()
  categories: string[];

  @IsObject()
  uz: NewsLanguage;

  @IsObject()
  ru: NewsLanguage;

  @IsObject()
  en: NewsLanguage;

  @IsObject()
  уз: NewsLanguage;
}

export default CreateNewsDto;
