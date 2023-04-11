import { IsArray, IsNotEmpty, IsString } from "class-validator";

class CreateProjectLangDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}

export default CreateProjectLangDto;
