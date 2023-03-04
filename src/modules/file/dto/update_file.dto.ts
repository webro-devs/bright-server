import { IsNotEmpty, IsString } from "class-validator";

class UpdateFileDto {
  @IsNotEmpty()
  @IsString()
  url: string;
  path: string;
}

export default UpdateFileDto;
