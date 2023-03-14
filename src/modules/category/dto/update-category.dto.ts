import { IsArray, IsOptional, IsString } from "class-validator";
import { News } from "../../news/news.entity";

class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  uz: string;

  @IsOptional()
  @IsString()
  en: string;

  @IsOptional()
  @IsString()
  ru: string;

  @IsOptional()
  @IsString()
  уз: string;
}

export default UpdateCategoryDto;
