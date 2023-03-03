import { IsNotEmpty, IsString } from "class-validator";

class CreatPermissionDto {
  @IsNotEmpty()
  @IsString()
  title: string;
}

export default CreatPermissionDto;
