/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
export const data: Data = {
  report: [],
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Data {
  report: {
    id: string;
    source: string;
    amount: number;
    created_at: Date;
    updated_at: Date;
    type: ReportType;
  }[];
}

export enum ReportType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

data.report.push({
  id: 'uuid',
  source: 'Salary',
  amount: 7500,
  created_at: new Date(),
  updated_at: new Date(),
  type: ReportType.INCOME,
});
