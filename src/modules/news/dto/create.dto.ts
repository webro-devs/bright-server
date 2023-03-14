import {
  IsArray,
  IsNotEmpty,
  IsString,
  IsObject,
  IsOptional,
  isArray,
  isObject,
} from "class-validator";
import { State } from "../../../infra/shared/enums";
import { NewsLanguage } from "../../news-language/news-language.entity";
import { Admin } from "../../admin/admin.entity";
import { Transform } from "class-transformer";

function parseTextToArray(name: string, value?: string) {
  const arr = value ? JSON.parse(value) : "";
  if (!isArray(arr)) {
    throw new Error(`${name} should be array.`);
  }
  return arr;
}

function parseTextToObject(name: string, value?: string) {
  const obj = value ? JSON.parse(value) : "";
  if (!isObject(obj)) {
    throw new Error(`${name} should be object.`);
  }
  return obj;
}

class CreateNewsDto {
  @IsOptional()
  @IsArray()
  state: State;

  @IsNotEmpty()
  @IsString()
  creator: string;

  @IsNotEmpty()
  @IsString()
  publishDate: string;

  @IsNotEmpty()
  @IsArray()
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

  @IsOptional()
  @IsObject()
  uzFile;

  @IsOptional()
  @IsObject()
  ruFile;

  @IsOptional()
  @IsObject()
  enFile;

  @IsOptional()
  @IsObject()
  узFile;
}

export default CreateNewsDto;
