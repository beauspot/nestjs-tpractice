/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  ParseEnumPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  AppService,
  ReportType,
  IncomeReport,
  ExpenseReport,
} from '../app.service';
import { CreateReportDTO } from '../DTO/report.dto';

@Controller('report/:type')
export class AppController {
  constructor(private readonly incomeReportsService: AppService) {}

  @Get()
  getAllReports(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
  ): (IncomeReport | ExpenseReport)[] | { message: string } {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.incomeReportsService.getAllReportsService(reportType);
  }

  @Get(':id')
  getReportById(
    @Param('id', ParseIntPipe) id: number,
  ): IncomeReport | ExpenseReport {
    return this.incomeReportsService.getIncomeReportByIdService(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createIncomeReport(
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
    @Body() newReport: CreateReportDTO,
  ): IncomeReport | ExpenseReport {
    return this.incomeReportsService.createReportService({
      type,
      ...newReport,
    });
  }

  @Put(':id')
  editincomeReportbyId(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedIncome: { id: number; type: ReportType; income: string },
  ): IncomeReport | ExpenseReport {
    return this.incomeReportsService.editIncomeReportByIdService(
      id,
      updatedIncome,
    );
  }

  @Delete(':id')
  deleteIncomeReportById(
    @Param('id', ParseIntPipe) id: number,
  ): IncomeReport | ExpenseReport {
    return this.incomeReportsService.deleteIncomeRequestService(id);
  }
}
 */