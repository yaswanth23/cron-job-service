import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsEnum } from "class-validator";
import { SCHEDULE_TYPES } from "src/constants";

export class CreateCronJobDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  jobName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  triggerLink: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  apiKey: string;

  @IsEnum(SCHEDULE_TYPES)
  @ApiProperty({ enum: SCHEDULE_TYPES })
  schedule: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  startDate: string;
}
