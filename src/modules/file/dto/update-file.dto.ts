import { IsNotEmpty, IsString } from "class-validator";

class UpdateFileDto {
  @IsNotEmpty()
  @IsString()
  url: string;

  @IsNotEmpty()
  @IsString()
  path: string;
}

export default UpdateFileDto;
