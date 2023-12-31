/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { AppService, ReportType, IncomeReport } from './app.service';

@Controller('report/:type')
export class AppController {
  constructor(private readonly incomeReportsService: AppService) {}

  @Get()
  getAllReports(): IncomeReport[] | { message: string } {
    return this.incomeReportsService.getAllReportsService();
  }

  @Get(':id')
  getReportById(@Param('id', ParseIntPipe) id: number): IncomeReport {
    return this.incomeReportsService.getIncomeReportByIdService(id);
  }

  @Post()
  createIncomeReport(
    @Param('type') type: ReportType,
    @Body() newIncome: { income: string },
  ): IncomeReport {
    return this.incomeReportsService.createIncomeReportService({
      type,
      ...newIncome,
    });
  }

  @Put(':id')
  editincomeReportbyId(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedIncome: { id: number; type: ReportType; income: string },
  ): IncomeReport {
    return this.incomeReportsService.editIncomeReportByIdService(
      id,
      updatedIncome,
    );
  }

  @Delete(':id')
  deleteIncomeReportById(@Param('id', ParseIntPipe) id: number): IncomeReport {
    return this.incomeReportsService.deleteIncomeRequestService(id);
  }
}
