/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsOptional,
} from 'class-validator';
import { ReportType } from '../interface/data';
import { Exclude, Expose } from 'class-transformer';

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

export class ResponseDTO {
  id: string;
  source: string;
  amount: number;
  @Exclude()
  created_at: Date;
  type: ReportType;
  @Exclude()
  updated_at: Date;

  @Expose({ name: 'createdAt' })
  transformCreatedAt() {
    return this.created_at;
  }

  constructor(partial: Partial<ResponseDTO>) {
    Object.assign(this, partial);
  }
}
