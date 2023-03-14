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
  state: State;

  @IsNotEmpty()
  // @IsArray()
  creator: Admin;

  @IsOptional()
  @IsString()
  publishDate: string;

  // @IsNotEmpty()
  // @IsArray()
  @Transform(({ value }: { value: string }) =>
    parseTextToArray("categories", value),
  )
  categories: string[];

  @IsOptional()
  uz: NewsLanguage;

  @IsOptional()
  ru: NewsLanguage;

  @IsOptional()
  en: NewsLanguage;

  @IsOptional()
  уз: NewsLanguage;
}

export default CreateNewsDto;
