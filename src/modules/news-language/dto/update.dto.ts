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
  languageKey: string;

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
  @IsString()
  uz: string;

  @IsOptional()
  @IsString()
  ru: string;

  @IsOptional()
  @IsString()
  en: string;

  @IsOptional()
  @IsString()
  уз: string;;
}

export default UpdateLanguageDto;
