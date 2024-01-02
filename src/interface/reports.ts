import { ReportType } from './data';

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

export interface ReportData {
  amount: number;
  source: string;
}
