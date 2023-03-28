import { IsOptional } from "class-validator";
import { News } from "../../news/news.entity";

class UpdateChatDto {
  @IsOptional()
  news: News;
}

export default UpdateChatDto;
