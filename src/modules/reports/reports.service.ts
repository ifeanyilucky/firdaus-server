import { Report, Prisma } from 'prisma/prisma-client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from 'src/shared/constants/global.constants';

@Injectable()
export class ReportService {
  constructor(private prisma: PrismaService) {}

  async findReport(params: {
    where: Prisma.ReportWhereUniqueInput;
  }): Promise<Report> {
    const { where } = params;
    const report = await this.prisma.report.findUnique({ where });
    return report;
  }

  async createReport(params: { data: Prisma }): Promise<Report> {
    const { data } = params;
    return await this.prisma.report.create({ data });
  }
  async allReports(params: {
    where?: Prisma.ReportWhereInput;
    orderBy?: Prisma.ReportOrderByWithRelationInput;
    select?: Prisma.ReportSelect;
    skip?: number;
  }): Promise<Report[]> {
    const { where, orderBy, select, skip } = params;
    return await this.prisma.report.findMany({
      where,
      orderBy,
      select,
      skip,
    });
  }

  @Roles(Role.TEACHER)
  async updateReport(params: {
    whereUniqueInput: Prisma.ReportWhereUniqueInput;
    data: Report;
  }): Promise<Report> {
    const { whereUniqueInput, data } = params;

    return await this.prisma.report.update({
      where: whereUniqueInput,
      data,
    });
  }
  @Roles(Role.TEACHER)
  async deleteReport(params: { whereUniqueInput }) {
    const { whereUniqueInput } = params;
    return await this.prisma.report.delete({ where: whereUniqueInput });
  }
}
