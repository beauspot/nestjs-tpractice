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
  ParseEnumPipe,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';

// Importing the services
import { ReportService } from './report.service';
import { ReportType } from '../interface/data';
import {
  CreateReportDTO,
  UpdateReportDTO,
  ResponseDTO,
} from '../DTO/report.dto';

@Controller('report/:type')
export class ReportController {
  constructor(private readonly appService: ReportService) {}

  @Get()
  getAllReports(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
  ): ResponseDTO[] {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.getAllReportServices(reportType);
  }

  @Get(':id')
  getReportById(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): ResponseDTO {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.getReportByIDService(reportType, id);
  }

  @HttpCode(201)
  @Post()
  createReport(
    @Body() { amount, source }: CreateReportDTO,
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
  ): ResponseDTO {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.createReportService(reportType, { amount, source });
  }

  @Put(':id')
  updateReportById(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateReportDTO,
  ): ResponseDTO {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.updateReportService(reportType, id, body);
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReportByID(@Param('id', ParseUUIDPipe) id: string) {
    return this.appService.deleteReportService(id);
  }
}
