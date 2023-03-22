import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

class InsertNotificationDto {
  @IsNotEmpty()
  @IsArray()
  news: string;

  @IsOptional()
  @IsString()
  from: string;
}

export default InsertNotificationDto;
