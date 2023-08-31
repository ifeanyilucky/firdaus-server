import { ReportSheet, Prisma } from 'prisma/prisma-client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReportService {
  constructor(private prisma: PrismaService) {}

  async findReportSheet(params: {
    where: Prisma.ReportSheetWhereUniqueInput;
  }): Promise<ReportSheet> {
    const { where } = params;
    const reportSheet = await this.prisma.reportSheet.findUnique({ where });
    return reportSheet;
  }

  async allReportSheets(params: {
    where;
    orderBy;
    select;
    skip;
  }): Promise<ReportSheet[]> {
    const { where, orderBy, select, skip } = params;
    return await this.prisma.reportSheet.findMany({
      where,
      orderBy,
      select,
      skip,
    });
  }

  async updateReportSheet(params: {
    whereUniqueInput: Prisma.ReportSheetWhereUniqueInput;
    data: ReportSheet;
  }): Promise<ReportSheet> {
    const { whereUniqueInput, data } = params;

    return await this.prisma.reportSheet.update({
      where: whereUniqueInput,
      data,
    });
  }

  async deleteReportSheet(params: { whereUniqueInput }) {
    const { whereUniqueInput } = params;
    return await this.prisma.reportSheet.delete({ where: whereUniqueInput });
  }
}
