import { IsNotEmpty, IsString } from "class-validator";

class UpdatePositionDto {
  @IsNotEmpty()
  @IsString()
  title: string;
}

export default UpdatePositionDto;
