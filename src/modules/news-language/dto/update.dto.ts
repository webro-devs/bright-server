import { IsOptional, IsString } from "class-validator";

class UpdateLanguageDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;
}

export default UpdateLanguageDto;
