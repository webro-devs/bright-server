import { IsString, IsOptional, IsObject } from "class-validator";
import { State } from "../../../infra/shared/enums";
import { NewsLanguage } from "../../news-language/news-language.entity";
import { Transform } from "class-transformer";
import { parseTextToArray, parseTextToObject } from "../../../infra/helpers";
import { Chat } from "../../chat/chat.entity";

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
  @IsString()
  mainCategory: string;

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
  chat: Chat;
}

export default CreateNewsDto;
