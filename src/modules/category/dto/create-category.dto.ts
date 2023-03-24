import { IsNotEmpty, IsString } from "class-validator";

class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  uz: string;

  @IsNotEmpty()
  @IsString()
  en: string;

  @IsNotEmpty()
  @IsString()
  ru: string;

  @IsNotEmpty()
  @IsString()
  уз: string;
}

export default CreateCategoryDto;
