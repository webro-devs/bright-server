import { IsNotEmpty, IsObject, IsOptional, IsString } from "class-validator";
import { Admin } from "../../admin/admin.entity";
import { Chat } from "../../chat/chat.entity";

class UpdateMessageDto {
  @IsOptional()
  user: Admin;

  @IsString()
  date: string;

  @IsString()
  @IsNotEmpty()
  body: string;

  @IsObject()
  chat: Chat;
}

export default UpdateMessageDto;
