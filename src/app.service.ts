/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Injectable } from '@nestjs/common';
import { IncomeReport, ExpenseReport, ReportData } from './interface/reports';
import { data } from './db/data';
import { ReportType } from './interface/data';
import { v4 as uuid } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';

const dbFilePath = path.resolve(process.cwd(), 'data.json');

@Injectable()
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

  getAllReportServices(type: ReportType) {
    const returnedData = data.report.filter((report) => report.type === type);
    return returnedData;
  }

  getReportByIDService(type: ReportType, id: string) {
    const returnedData = data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);
    return returnedData;
  }

  createReportService(type: ReportType, { amount, source }: ReportData) {
    const newReport = {
      id: uuid(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type,
    };
    data.report.push(newReport);
    /**
     * Feel Free to destructure the body
     * {amount, source} : {amount: number; source: string}
     */
    this.saveDataToFile();
    return newReport;
  }

  updateReportService(type: ReportType, id: string, body: ReportData) {
    const reportToUpdate = data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);
    if (!reportToUpdate) return;

    const reportIndex = data.report.findIndex(
      (report) => report.id === reportToUpdate.id,
    );

    data.report[reportIndex] = {
      ...data.report[reportIndex],
      ...body,
      updated_at: new Date(),
    };
    this.saveDataToFile();
    return data.report[reportIndex];
  }

  deleteReportService(id: string) {
    const reportIndex = data.report.findIndex((report) => report.id === id);
    if (reportIndex === -1) return;
    data.report.splice(reportIndex, 1);
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
