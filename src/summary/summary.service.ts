/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { ReportService } from '../report/report.service';
import { ReportType } from 'src/interface/data';

@Injectable()
export class SummaryService {
  constructor(private readonly reportService: ReportService) {}

  calculateSummary() {
    const totalExpense = this.reportService
      .getAllReportServices(ReportType.EXPENSE)
      .reduce((sum, report) => sum + report.amount, 0);
    const totalIncome = this.reportService
      .getAllReportServices(ReportType.INCOME)
      .reduce((sum, report) => sum + report.amount, 0);
    return {
      totalIncome,
      totalExpense,
      netIncome: totalIncome - totalExpense,
    };
  }
}
