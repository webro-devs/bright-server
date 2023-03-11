import { IsArray, IsObject, IsOptional, IsString } from "class-validator";
import { Category } from "../../category/category.entity";
import { Admin } from "../../admin/admin.entity";
import { State } from "../../../infra/shared/enums";
import { NewsLanguage } from "../../news-language/news-language.entity";

class UpdateNewsDto {
  @IsOptional()
  @IsArray()
  state: State;

  @IsOptional()
  @IsString()
  publishDate: string;

  @IsOptional()
  @IsArray()
  categories: Category[];

  @IsOptional()
  @IsString()
  creator: Admin;

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
