import { IsNotEmpty, IsString } from "class-validator";

class CreatePositionDto {
  @IsNotEmpty()
  @IsString()
  title: string;
}

export default CreatePositionDto;
