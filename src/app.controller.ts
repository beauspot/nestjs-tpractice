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
  ParseEnumPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

// Importing the services
import { AppService } from './app.service';

import * as fs from 'fs';
import * as path from 'path';
import { IncomeReport, ExpenseReport } from './interface/reports';
import { data } from './db/data';
import { ReportType } from './interface/data';
import { v4 as uuid } from 'uuid';

const dbFilePath = path.resolve(process.cwd(), 'data.json');

@Controller('report/:type')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllReports(@Param('type') type: string) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.getAllReportServices(reportType);
  }

  @Get(':id')
  getReportById(@Param('type') type: string, @Param('id') id: string) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.getReportByIDService(reportType, id);
  }

  @HttpCode(201)
  @Post()
  createReport(
    @Body() { amount, source }: { amount: number; source: string },
    @Param('type') type: string,
  ) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.createReportService(reportType, { amount, source });
  }

  @Put(':id')
  updateReportById(
    @Param('type') type: string,
    @Param('id') id: string,
    @Body() body: { amount: number; source: string },
  ) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.updateReportService(reportType, id, body);
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReportByID(@Param('id') id: string) {
    return this.appService.deleteReportService(id);
  }
}
