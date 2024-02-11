import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from '../auth/auth.service';
import { UserModule } from '../user/user.module';
import { Supplier } from './entities/supplier.entity';
import { SupplierController } from './supplier.controller';
import { SupplierService } from './supplier.service';

@Module({
  imports: [TypeOrmModule.forFeature([Supplier]), UserModule],
  controllers: [SupplierController],
  providers: [SupplierService, AuthService, JwtService],
  exports: [SupplierService],
})
export class SupplierModule {}
