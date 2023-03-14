import { IsOptional, IsString } from "class-validator";

class UpdatePositionDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;
}

export default UpdatePositionDto;
