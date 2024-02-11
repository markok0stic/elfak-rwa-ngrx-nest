import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesEnum } from '@shared/enums/roles.enum';
import { SupplierService } from './supplier.service';
import { SupplierDto } from './dto/supplier.dto';

@Controller('suppliers')
export class SupplierController {
  constructor(private supplierService: SupplierService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.User, RolesEnum.Admin)
  @Post()
  public addSupplier(@Body() dto: SupplierDto) {
    return this.supplierService.create(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.User, RolesEnum.Admin)
  @Get()
  public getSuppliers() {
    return this.supplierService.getAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.User, RolesEnum.Admin)
  @Get(':id')
  public getSupplierById(@Param('id', ParseIntPipe) id: number) {
    return this.supplierService.getOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.User, RolesEnum.Admin)
  @Put(':id')
  public updateSupplier(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: SupplierDto,
  ) {
    return this.supplierService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.User, RolesEnum.Admin)
  @Delete(':id')
  public deleteSupplier(@Param('id', ParseIntPipe) id: number) {
    return this.supplierService.delete(id);
  }
}
