import { IsNotEmpty, IsString } from "class-validator";

class CreatePositionDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}

export default CreatePositionDto;
