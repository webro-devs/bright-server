import { IsNotEmpty, IsOptional, IsString } from "class-validator";

class CreateEditorDto {
  @IsNotEmpty()
  @IsString()
  news: string;

  @IsNotEmpty()
  @IsString()
  editor: string;

  @IsOptional()
  @IsString()
  editedDate: Date;
}

export default CreateEditorDto;
