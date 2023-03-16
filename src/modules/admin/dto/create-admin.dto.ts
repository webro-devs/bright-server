import { IsArray, IsNotEmpty, IsString, IsOptional } from "class-validator";
import { Transform } from "class-transformer";
import { parseTextToArray } from "../../../infra/helpers";
class CreateAdminDto {
  @IsNotEmpty()
  @IsString()
  login: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  education: string;

  @IsOptional()
  avatar;

  @IsNotEmpty()
  @IsArray()
  @Transform(({ value }: { value: string }) =>
    parseTextToArray("permissions", value),
  )
  permissions: string[];

  @IsNotEmpty()
  @IsString()
  position: string;
}

export default CreateAdminDto;
