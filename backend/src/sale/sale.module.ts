import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { Product } from '../product/entities/product.entity';
import { SaleController } from './sale.controller';
import { SaleService } from './sale.service';
import { SaleDetail } from './entities/sale.details.entity';
import { UserModule } from '../user/user.module';
import { ReportService } from './report.service';
import { ReportsController } from './report.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Sale, SaleDetail, Product]), UserModule],
  controllers: [SaleController, ReportsController],
  providers: [SaleService, ReportService],
})
export class SaleModule {}
