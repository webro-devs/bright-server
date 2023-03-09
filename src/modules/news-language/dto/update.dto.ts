import { IsOptional, IsString } from "class-validator";

class UpdateLanguageDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  shortDescription: string;

  @IsOptional()
  @IsString()
  shortLink: string;

  @IsOptional()
  @IsString()
  file: string;
}

export default UpdateLanguageDto;
