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
import {
  ApiResponse,
  ApiBody,
  ApiTags,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('reports')
@Controller('reports')
export class ReportController {
  constructor(private reportService: ReportService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get(':id')
  async findReport(@Param('id') id: string): Promise<Report> {
    return await this.reportService.findReport({ where: { id } });
  }

  @ApiBearerAuth()
  // @ApiResponse({type: })
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
  @ApiParam({ type: String, name: 'id' })
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
