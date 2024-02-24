import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from '../auth/auth.service';
import { UserModule } from '../user/user.module';
import { Brand } from './entities/brand.entity';
import { BrandController } from './brand.controller';
import { BrandService } from './brand.service';

@Module({
  imports: [TypeOrmModule.forFeature([Brand]), UserModule],
  controllers: [BrandController],
  providers: [BrandService, AuthService, JwtService],
  exports: [BrandService],
})
export class BrandModule {}
