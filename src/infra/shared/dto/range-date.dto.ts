import { IsOptional, IsString } from "class-validator";

class DateRangeDto {
  @IsOptional()
  @IsString()
  startDate: string;

  @IsOptional()
  @IsString()
  endDate: string;
}

export default DateRangeDto;
