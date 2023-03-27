import { IsOptional, IsString } from "class-validator";
import { News } from "../../news/news.entity";

class CreateChatDto {
  @IsOptional()
  @IsString()
  news: string;
}

export default CreateChatDto;
