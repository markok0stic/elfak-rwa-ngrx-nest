import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from '../auth/auth.service';
import { UserModule } from '../user/user.module';
import { Model } from './entities/model.entity';
import { ModelController } from './model.controller';
import { ModelService } from './model.service';

@Module({
  imports: [TypeOrmModule.forFeature([Model]), UserModule],
  controllers: [ModelController],
  providers: [ModelService, AuthService, JwtService],
  exports: [ModelService],
})
export class ModelModule {}
