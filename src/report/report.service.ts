/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Injectable } from '@nestjs/common';
import {
  IncomeReport,
  ExpenseReport,
  ReportData,
  UpdateReportData,
} from '../interface/reports';
import { data } from '../db/data';
import { ReportType } from '../interface/data';
import { v4 as uuid } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';
import { ResponseDTO } from '../DTO/report.dto';

const dbFilePath = path.resolve(process.cwd(), 'data.json');

@Injectable()
export class ReportService {
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

  getAllReportServices(type: ReportType): ResponseDTO[] {
    const returnedData = data.report
      .filter((report) => report.type === type)
      .map((report) => new ResponseDTO(report));
    return returnedData;
  }

  getReportByIDService(type: ReportType, id: string): ResponseDTO {
    const returnedData = data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);
    if (!returnedData) return;
    return new ResponseDTO(returnedData);
  }

  createReportService(
    type: ReportType,
    { amount, source }: ReportData,
  ): ResponseDTO {
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
    return new ResponseDTO(newReport);
  }

  updateReportService(
    type: ReportType,
    id: string,
    body: UpdateReportData,
  ): ResponseDTO {
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
    return new ResponseDTO(data.report[reportIndex]);
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
