import { IsNotEmpty, IsString } from "class-validator";
import { Advertisement } from "../../adv/adv.entity";

class CreateUniqueAddressDto {
  @IsNotEmpty()
  @IsString()
  ipAddress: string;
}

export default CreateUniqueAddressDto;
