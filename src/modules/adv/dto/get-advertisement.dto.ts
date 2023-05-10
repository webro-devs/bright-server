import { IsNotEmpty, IsString } from "class-validator";

class GetAdvertisementDto {
  @IsNotEmpty()
  @IsString()
  ipAddress: string;

  @IsNotEmpty()
  @IsString()
  type: string;
}

export default GetAdvertisementDto;
