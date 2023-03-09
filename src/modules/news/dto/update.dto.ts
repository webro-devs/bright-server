import { IsArray, IsObject, IsOptional, IsString } from "class-validator";
import { Category } from "../../category/category.entity";
import { Admin } from "../../admin/admin.entity";
import { State } from "../../../infra/shared/enums";

class UpdateNewsDto {
  @IsOptional()
  @IsArray()
  state: State[];

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
  uz: object;

  @IsOptional()
  @IsObject()
  ru: object;

  @IsOptional()
  @IsObject()
  en: object;

  @IsOptional()
  @IsObject()
  уз: object;
}

export default UpdateNewsDto;
