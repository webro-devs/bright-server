import { IsNotEmpty, IsString } from "class-validator";

class CreateEditorDto {
  @IsNotEmpty()
  @IsString()
  news: string;

  @IsNotEmpty()
  @IsString()
  editor: string;
}

export default CreateEditorDto;
