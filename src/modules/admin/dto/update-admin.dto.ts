import {
  isArray,
  IsArray,
  IsObject,
  IsOptional,
  IsString,
} from "class-validator";
import { Transform } from "class-transformer";

function parseTextToArray(name: string, value?: string) {
  console.log(value);

  const arr = value ? JSON.parse(value) : "";
  if (!isArray(arr)) {
    throw new Error(`${name} should be array.`);
  }
  return arr;
}
class UpdateAdminDto {
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

  @IsOptional()
  @IsArray()
  @Transform(({ value }: { value: string }) =>
    parseTextToArray("permissions", value),
  )
  permissions: string[];

  @IsOptional()
  @IsString()
  position: string;
}

export default UpdateAdminDto;
