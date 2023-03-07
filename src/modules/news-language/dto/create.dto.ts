import { IsNotEmpty, IsString } from "class-validator";

class CreateLanguageDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}

export default CreateLanguageDto;
