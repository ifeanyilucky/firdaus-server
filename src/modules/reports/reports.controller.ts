import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ReportService } from './reports.service';
import { Prisma, Report } from '@prisma/client';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('reports')
export class ReportController {
  constructor(private reportService: ReportService) {}

  @UseGuards(AuthGuard)
  @Get(':id')
  async findReport(@Param('id') id: string): Promise<Report> {
    return await this.reportService.findReport({ where: { id } });
  }

  @UseGuards(AuthGuard)
  @Get()
  async getReports(): Promise<Report[]> {
    return await this.reportService.allReports({});
  }

  @UseGuards(AuthGuard)
  @Post('create')
  async createReport(@Body() data: Prisma.ReportCreateInput): Promise<Report> {
    return await this.reportService.createReport({ data });
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateReport(
    @Body() data: Prisma.ReportUpdateInput,
    @Param('id') id: string,
  ): Promise<Report> {
    return await this.reportService.updateReport({
      whereUniqueInput: { id },
      data,
    });
  }
}
