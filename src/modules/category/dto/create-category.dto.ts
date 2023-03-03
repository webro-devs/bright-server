import { IsNotEmpty, IsString } from "class-validator";

class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  title: string;
}

export default CreateCategoryDto;
