import { IsNotEmpty, IsString } from "class-validator";

class UpdatePositionDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}

export default UpdatePositionDto;
