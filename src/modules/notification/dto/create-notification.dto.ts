import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

class CreateNotificationDto {
  @IsNotEmpty()
  @IsArray()
  newsIds: string[];
}

export default CreateNotificationDto;
