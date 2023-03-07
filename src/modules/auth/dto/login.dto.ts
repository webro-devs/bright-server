import { IsNotEmpty, IsString } from "class-validator";
class LoginDto {
  @IsNotEmpty()
  @IsString()
  login: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export default LoginDto;
