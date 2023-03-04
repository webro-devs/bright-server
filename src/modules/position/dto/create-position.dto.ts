import { IsNotEmpty, IsString } from "class-validator";

class CreatPositionDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}

export default CreatPositionDto;
