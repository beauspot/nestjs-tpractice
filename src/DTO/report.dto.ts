/* eslint-disable prettier/prettier */
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsOptional,
} from 'class-validator';

export class CreateReportDTO {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  source: string;
}

export class UpdateReportDTO {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @IsOptional()
  amount: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  source: string;
}
