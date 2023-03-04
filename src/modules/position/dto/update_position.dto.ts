import { IsNotEmpty, IsString } from "class-validator";

class UpdatePositionDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  description: string;
}

export default UpdatePositionDto;
