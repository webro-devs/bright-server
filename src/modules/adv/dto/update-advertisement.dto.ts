import { IsNumber, IsOptional, IsString } from "class-validator";
import { AdvertisementEnum } from "../../../infra/shared/enums";

class UpdateAdvertisementDto {
  @IsOptional()
  @IsString()
  date: Date;

  @IsOptional()
  @IsString()
  categoryId: string;

  @IsOptional()
  @IsString()
  imgUrl: string;

  @IsOptional()
  @IsString()
  imgMobileUrl: string;

  @IsOptional()
  @IsString()
  link: string;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsNumber()
  viewTotalCount: number;

  @IsOptional()
  @IsNumber()
  viewUniqueCount: number;

  @IsOptional()
  @IsString()
  isActive: string;

  @IsOptional()
  @IsString()
  type: AdvertisementEnum;
}

export default UpdateAdvertisementDto;
