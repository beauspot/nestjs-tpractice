/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CustomInterceptor } from '../custom.interceptor';

@Module({
  controllers: [ReportController],
  providers: [
    ReportService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
  exports: [ReportService],
})
export class ReportModule {}
