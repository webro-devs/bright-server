import { IsNotEmpty, IsString } from "class-validator";

class UpdatePermissionDto {
  @IsNotEmpty()
  @IsString()
  title: string;
}

export default UpdatePermissionDto;
