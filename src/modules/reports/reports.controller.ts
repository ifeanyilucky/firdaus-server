import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Body,
  Param,
} from '@nestjs/common';
import { Response } from 'express';
import { ReportService } from './reports.service';
import { ReportSheet } from '@prisma/client';

@Controller('reports')
export class ReportController {
  constructor(private reportService: ReportService) {}

  @Get(':id')
  async findReport(@Param('id') id: string): Promise<ReportSheet> {
    return await this.reportService.findReportSheet({ where: { id } });
  }

  @Patch(':id')
  async updateReport(
    @Body() data: ReportSheet,
    @Param('id') id: string,
  ): Promise<ReportSheet> {
    return await this.reportService.updateReportSheet({
      whereUniqueInput: { id },
      data,
    });
  }
}
