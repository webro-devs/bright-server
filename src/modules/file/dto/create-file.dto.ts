import { IsNotEmpty, IsString } from "class-validator";

class CreatFileDto {
  @IsNotEmpty()
  @IsString()
  url: string;

  @IsNotEmpty()
  @IsString()
  path: string;
}

export default CreatFileDto;
