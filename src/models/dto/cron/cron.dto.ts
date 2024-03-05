import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsEnum, IsOptional } from "class-validator";
import { SCHEDULE_TYPES } from "../../../constants";

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

export class UpdateCronJobDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  jobName: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  triggerLink: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  apiKey: string;

  @IsEnum(SCHEDULE_TYPES)
  @IsOptional()
  @ApiProperty({ enum: SCHEDULE_TYPES })
  schedule: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  startDate: string;
}
