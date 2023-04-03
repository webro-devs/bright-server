import { IsArray, IsObject, IsOptional, IsString } from "class-validator";
import { State } from "../../../infra/shared/enums";
import { NewsLanguage } from "../../news-language/news-language.entity";
import { Transform } from "class-transformer";
import { parseTextToArray, parseTextToObject } from "../../../infra/helpers";

class UpdateNewsDto {
  @IsOptional()
  state: State;

  @IsOptional()
  @IsString()
  publishDate: string;

  @IsOptional()
  @IsArray()
  // @Transform(({ value }: { value: string }) =>
  //   parseTextToArray("categories", value),
  // )
  categories: string[];

  @IsOptional()
  @IsString()
  mainCategory: string;

  @IsOptional()
  @IsString()
  file: string;

  @IsOptional()
  @IsObject()
  // @Transform(({ value }: { value: string }) => parseTextToObject("uz", value))
  uz: NewsLanguage;

  @IsOptional()
  @IsObject()
  // @Transform(({ value }: { value: string }) => parseTextToObject("ru", value))
  ru: NewsLanguage;

  @IsOptional()
  @IsObject()
  // @Transform(({ value }: { value: string }) => parseTextToObject("en", value))
  en: NewsLanguage;

  @IsOptional()
  @IsObject()
  // @Transform(({ value }: { value: string }) => parseTextToObject("уз", value))
  уз: NewsLanguage;
}

export default UpdateNewsDto;
