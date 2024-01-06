/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { Controller, Get } from '@nestjs/common';
import { SummaryService } from './summary.service';

@Controller('summary')
export class SummaryController {
  // Returns a totoal of our income
  // a total of our expenses
  // and the net-income = otal income - total expense
  constructor(private readonly summaryService: SummaryService) {}
  @Get()
  getSumamry() {
    return this.summaryService.calculateSummary();
  }
}
