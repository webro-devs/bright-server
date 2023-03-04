import { IsNotEmpty, IsString } from "class-validator";

class CreatPositionDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  description: string;
}

export default CreatPositionDto;
