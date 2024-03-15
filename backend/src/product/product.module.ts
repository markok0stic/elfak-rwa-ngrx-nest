import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { Product } from './entities/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Category } from '../category/entities/category.entity';
import { Brand } from '../brand/entities/brand.entity';
import { Model } from '../model/entities/model.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Category, Brand, Model]),
    UserModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, AuthService, JwtService],
  exports: [ProductService],
})
export class ProductModule {}
