import { IsArray, IsNotEmpty, IsString, IsObject } from "class-validator";
import { Category } from "../../category/category.entity";
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
  categories: string[];

  @IsNotEmpty()
  @IsObject()
  uz: NewsLanguage;

  @IsNotEmpty()
  @IsObject()
  ru: NewsLanguage;

  @IsNotEmpty()
  @IsObject()
  en: NewsLanguage;

  @IsNotEmpty()
  @IsObject()
  уз: NewsLanguage;
}

export default CreateNewsDto;
