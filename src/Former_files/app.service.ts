/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
/* import * as fs from 'fs';
import * as path from 'path';
import { CreateReportDTO, UpdateReportDTO } from './DTO/report.dto';

const dbFilePath = path.resolve(process.cwd(), 'data.json'); */

// Enum to define the allowed report types
export enum ReportType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

// Defining a simple database structure
export interface IncomeReport {
  id: number;
  type: ReportType;
  income: string;
}

export interface ExpenseReport {
  id: number;
  type: ReportType;
  expense: string;
}

/* @Injectable()
export class AppService {
  // Mock data array
private reports: (IncomeReport | ExpenseReport)[] = [];

  constructor() {
    try {
      const data = fs.readFileSync(dbFilePath, 'utf-8');
      this.reports = JSON.parse(data);
    } catch (error) {
      console.log('Error Reading Data File: ', error.message);
    }
  }

  getAllReportsService(
    type: ReportType,
  ): (IncomeReport | ExpenseReport)[] | { message: string } {
    const filteredReports = this.reports.filter(
      (income) => income.type === type,
    );

    if (filteredReports.length === 0) {
      return { message: `There are no ${type} reports to be reported.` };
    } else {
      return filteredReports;
    }
  }

  getIncomeReportByIdService(id: number): IncomeReport | ExpenseReport {
    const income = this.reports.find((income) => income.id === id);
    if (!income) throw new NotFoundException(`Item with ID ${id} not found`);
    return income;
  }

  createReportService(
    newReport: CreateReportDTO,
  ): IncomeReport | ExpenseReport {
    const id = this.reports.length + 1;
    //checking the type property in createReportDTO
    if (newReport.type === 'income') {
      const createdIncome: IncomeReport = {
        id,
        type: ReportType.INCOME,
        income: newReport.name,
      };
      this.reports.push(createdIncome);
      this.saveDataToFile();
      return createdIncome;
    } else if (newReport.type === 'expense') {
      const createdExpense: ExpenseReport = {
        id,
        type: ReportType.EXPENSE,
        expense: newReport.name,
      };
      this.reports.push(createdExpense);
      this.saveDataToFile();
      return createdExpense;
    } else {
      // Handle invalid type
      throw new Error('Invalid report type');
    }
  }

  editIncomeReportByIdService(
    id: number,
    updatedIncome: UpdateReportDTO,
  ): IncomeReport | ExpenseReport {
    const index = this.reports.findIndex((income) => income.id === id);
    if (index !== -1) {
      if (updatedIncome.id !== undefined)
        this.reports[index].id = updatedIncome.id;

      if (updatedIncome.name !== undefined)
        this.reports[index].name = updatedIncome.name;

      if (updatedIncome.type !== undefined)
        this.reports[index].type = updatedIncome.type;

      this.saveDataToFile();
      return this.reports[index];
    }
    throw new NotFoundException(`Item with ID ${id} could not be found`);
  }

  deleteIncomeRequestService(id: number): IncomeReport | ExpenseReport {
    const index = this.reports.findIndex((income) => income.id === id);
    if (index !== -1) {
      const removedIncome = this.reports[index];
      this.reports = this.reports.filter((income) => income.id !== id);
      this.saveDataToFile();
      return removedIncome;
    }
    throw new NotFoundException(`Item with ID ${id} could not be found`);
  }
  // Saving the data to a file
  private saveDataToFile() {
    fs.writeFileSync(
      dbFilePath,
      JSON.stringify(this.reports, null, 2),
      'utf-8',
    );
  } 
}
 */