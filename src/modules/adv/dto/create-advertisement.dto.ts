import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { AdvertisementEnum } from "../../../infra/shared/enums";

class CreateAdvertisementDto {
  @IsNotEmpty()
  @IsString()
  imgUrl: string;

  @IsNotEmpty()
  @IsString()
  imgMobileUrl: string;

  @IsOptional()
  @IsString()
  categoryId: string;

  @IsNotEmpty()
  @IsString()
  link: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  type: AdvertisementEnum;

  @IsOptional()
  @IsString()
  creator: string;
}

export default CreateAdvertisementDto;
