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
  photoDesc: string;

  @IsOptional()
  @IsString()
  shortLink: string;

  @IsOptional()
  @IsArray()
  tags: string[];
}

export default UpdateLanguageDto;
