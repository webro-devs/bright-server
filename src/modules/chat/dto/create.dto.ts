import { IsOptional } from "class-validator";
import { News } from "../../news/news.entity";

class CreateChatDto {
  @IsOptional()
  news: object;
}

export default CreateChatDto;
