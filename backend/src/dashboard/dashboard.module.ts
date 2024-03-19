import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { UserModule } from '../user/user.module';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from '../sale/entities/sale.entity';
import { SaleDetail } from '../sale/entities/sale.details.entity';
import { Product } from '../product/entities/product.entity';
import { Category } from '../category/entities/category.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sale, SaleDetail, Product, User, Category]),
    UserModule,
  ],
  controllers: [DashboardController],
  providers: [DashboardService, AuthService, JwtService],
  exports: [DashboardService],
})
export class DashboardModule {}
