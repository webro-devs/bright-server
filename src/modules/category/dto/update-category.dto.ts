import { IsOptional, IsString } from "class-validator";

class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  title: string;
}

export default UpdateCategoryDto;
