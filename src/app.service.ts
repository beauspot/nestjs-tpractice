/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

const dbFilePath = path.resolve(process.cwd(), 'data.json');

// Enum to define the allowed report types
export enum ReportType {
  INCOME = 'income',
  EXPENSES = 'expenses',
}

// Defining a simple database structure
export interface IncomeReport {
  id: number;
  type: ReportType;
  income: string;
}

@Injectable()
export class AppService {
  // Mock data array
  private incomes: IncomeReport[] = [];

  constructor() {
    try {
      const data = fs.readFileSync(dbFilePath, 'utf-8');
      this.incomes = JSON.parse(data);
    } catch (error) {
      console.log('Error Reading Data File: ', error.message);
    }
  }

  getAllReportsService(): IncomeReport[] | { message: string } {
    if (this.incomes.length === 0)
      return { message: 'There are no incomes to be reported.' };
    else return this.incomes;
  }

  getIncomeReportByIdService(id: number): IncomeReport {
    const income = this.incomes.find((income) => income.id === id);
    if (!income) throw new NotFoundException(`Item with ID ${id} not found`);
    return income;
  }

  createIncomeReportService(newIncome: Omit<IncomeReport, 'id'>): IncomeReport {
    const id = this.incomes.length + 1;
    const createdIncome = { id, ...newIncome };
    this.incomes.push(createdIncome);
    this.saveDataToFile();
    return createdIncome;
  }

  editIncomeReportByIdService(
    id: number,
    updatedIncome: IncomeReport,
  ): IncomeReport {
    const index = this.incomes.findIndex((income) => income.id === id);
    if (index !== -1) {
      this.incomes[index] = { ...this.incomes[index], ...updatedIncome };
      this.saveDataToFile();
      return this.incomes[index];
    }
    throw new NotFoundException(`Item with ID ${id} could not be found`);
  }

  deleteIncomeRequestService(id: number): IncomeReport {
    const index = this.incomes.findIndex((income) => income.id === id);
    if (index !== -1) {
      const removedIncome = this.incomes[index];
      this.incomes = this.incomes.filter((income) => income.id !== id);
      this.saveDataToFile();
      return removedIncome;
    }
    throw new NotFoundException(`Item with ID ${id} could not be found`);
  }
  // Saving the data to a file
  private saveDataToFile() {
    fs.writeFileSync(
      dbFilePath,
      JSON.stringify(this.incomes, null, 2),
      'utf-8',
    );
  }
}
