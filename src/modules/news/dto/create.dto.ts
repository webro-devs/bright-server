import { IsArray, IsNotEmpty, IsString, IsObject } from "class-validator";
import { Category } from "../../category/category.entity";
import { Admin } from "../../admin/admin.entity";
import { State } from "../../../infra/shared/enums";
import { NewsLanguage } from "../../news-language/news-language.entity";

class CreateNewsDto {
  @IsNotEmpty()
  @IsArray()
  state: State[];

  @IsNotEmpty()
  @IsString()
  publishDate: string;

  @IsNotEmpty()
  @IsArray()
  categories: Category[];

  @IsNotEmpty()
  @IsString()
  creator: Admin;

  @IsNotEmpty()
  uz: NewsLanguage;

  @IsNotEmpty()
  ru: NewsLanguage;

  @IsNotEmpty()
  en: NewsLanguage;

  @IsNotEmpty()
  уз: NewsLanguage;
}

export default CreateNewsDto;
