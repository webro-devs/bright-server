import { IsNotEmpty, IsString } from "class-validator";

class CreatFileDto {
  @IsNotEmpty()
  @IsString()
  url: string;
  path: string;
}

export default CreatFileDto;
