import { IsOptional, IsString, IsArray } from "class-validator";

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

  @IsOptional()
  @IsArray()
  tags: string[];
}

export default UpdateLanguageDto;
