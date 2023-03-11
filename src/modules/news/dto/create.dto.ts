import {
  IsArray,
  IsNotEmpty,
  IsString,
  IsObject,
  IsOptional,
  isArray,
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
  @Transform(({ value }: { value: string }) =>
    parseTextToArray("categories", value),
  )
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
