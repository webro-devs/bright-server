import { IsArray, IsNotEmpty, IsString } from "class-validator";

class UpdateProjectLangDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}

export default UpdateProjectLangDto;
