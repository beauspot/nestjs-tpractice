/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsIn, IsOptional } from 'class-validator';

export class CreateReportDTO {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsIn(['income', 'expense'])
  type: 'income' | 'expense';
}

export class UpdateReportDTO {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsOptional()
  name: string;

  @IsOptional()
  @IsIn(['income', 'expense'])
  type?: 'income' | 'expense';
}
