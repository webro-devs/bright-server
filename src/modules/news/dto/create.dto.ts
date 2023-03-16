import {
  IsNotEmpty,
  IsString,
  IsOptional,
  isArray,
  isObject,
  IsObject,
} from "class-validator";
import { State } from "../../../infra/shared/enums";
import { NewsLanguage } from "../../news-language/news-language.entity";
import { Admin } from "../../admin/admin.entity";
import { Transform } from "class-transformer";

function parseTextToArray(name: string, value?: string) {
  console.log(value);

  const arr = value ? JSON.parse(value) : "";
  if (!isArray(arr)) {
    throw new Error(`${name} should be array.`);
  }
  return arr;
}

function parseTextToObject(name: string, value?: string) {
  console.log(value);

  const obj = value ? JSON.parse(value) : "";
  if (!isObject(obj)) {
    throw new Error(`${name} should be Object.`);
  }
  return obj;
}

class CreateNewsDto {
  @IsOptional()
  state: State;

  @IsOptional()
  @IsString()
  publishDate: string;

  @IsOptional()
  @Transform(({ value }: { value: string }) =>
    parseTextToArray("categories", value),
  )
  categories: string[];

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

export default CreateNewsDto;
