import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  ParseIntPipe, Delete,
} from '@nestjs/common';
import { SaleService } from './sale.service';
import { SaleDto } from './dto/sale.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';

@Controller('sales')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  createSale(@Body() saleDto: SaleDto) {
    return this.saleService.createSale(saleDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  public getAllSales() {
    return this.saleService.getAllSales();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  public getSaleById(@Param('id', ParseIntPipe) id: number) {
    return this.saleService.getSaleById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  public delete(@Param('id', ParseIntPipe) id: number) {
    return this.saleService.delete(id);
  }
}
