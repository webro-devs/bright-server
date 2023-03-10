import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { News } from "../../news/news.entity";

class CreateLanguageDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  shortDescription: string;

  @IsNotEmpty()
  @IsString()
  shortLink: string;

  @IsNotEmpty()
  @IsString()
  file: string;

  @IsNotEmpty()
  @IsArray()
  tags: string[];
}

export default CreateLanguageDto;
