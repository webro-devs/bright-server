import { IsObject, IsOptional, IsString } from "class-validator";

class UpdateAdminProfileDto {
  @IsOptional()
  @IsString()
  login: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  fullName: string;

  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  education: string;

  @IsOptional()
  avatar;
}

export default UpdateAdminProfileDto;
