import {
  Controller,
  Res,
  HttpStatus,
  UseGuards,
  Param,
  ParseIntPipe,
  Post,
  Body,
  Get,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { raw, Response } from 'express';
import { ReportService } from './report.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { ReportDto } from './dto/report.dto';

@Controller('report')
export class ReportsController {
  constructor(private readonly reportService: ReportService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async getSalesReportById(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    const reportBuffer = await this.reportService.generateSaleReportById(id);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=sales-report-${new Date().toLocaleDateString(
        'en-US',
        {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        },
      )}.pdf`,
    );
    res.status(HttpStatus.OK).end(reportBuffer);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async getSalesReportByDate(
    @Body() reportDto: ReportDto,
    @Res() res: Response,
  ) {
    const reportBuffer = await this.reportService.generateSaleReportByDate(
      reportDto.dateFrom,
      reportDto.dateTo ?? new Date(),
    );
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=sales-report-${new Date().toLocaleDateString(
        'en-US',
        {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        },
      )}.pdf`,
    );
    res.status(HttpStatus.OK).end(reportBuffer);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/products-monthly')
  async getMonthlySalesByProduct(@Query('month') month: number) {
    if (!month) {
      throw new BadRequestException('Month parameter is required.');
    }
    return await this.reportService.getMonthlySalesByProduct(month.toString());
  }
}
