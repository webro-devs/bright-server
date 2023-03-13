import {
  IsArray,
  IsNotEmpty,
  IsString,
  isArray,
  IsOptional,
  IsObject,
} from "class-validator";
import { Transform } from "class-transformer";

function parseTextToArray(name: string, value?: string) {
  const arr = value ? JSON.parse(value) : "";
  if (!isArray(arr)) {
    throw new Error(`${name} should be array.`);
  }
  return arr;
}
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
  @IsObject()
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
