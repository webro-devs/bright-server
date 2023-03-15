import {
  IsArray,
  IsObject,
  IsOptional,
  IsString,
  isArray,
  isObject,
} from "class-validator";
import { Category } from "../../category/category.entity";
import { Admin } from "../../admin/admin.entity";
import { State } from "../../../infra/shared/enums";
import { NewsLanguage } from "../../news-language/news-language.entity";
import { Transform } from "class-transformer";

function parseTextToObject(name: string, value?: string) {
  console.log(value);

  const obj = value ? JSON.parse(value) : "";
  if (!isObject(obj)) {
    throw new Error(`${name} should be Object.`);
  }
  return obj;
}

class UpdateNewsDto {
  @IsOptional()
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
  @Transform(({ value }: { value: string }) => parseTextToObject("uz", value))
  uz: NewsLanguage;

  @IsOptional()
  @IsObject()
  @Transform(({ value }: { value: string }) => parseTextToObject("ru", value))
  ru: NewsLanguage;

  @IsOptional()
  @IsObject()
  @Transform(({ value }: { value: string }) => parseTextToObject("en", value))
  en: NewsLanguage;

  @IsOptional()
  @IsObject()
  @Transform(({ value }: { value: string }) => parseTextToObject("уз", value))
  уз: NewsLanguage;
}

export default UpdateNewsDto;
