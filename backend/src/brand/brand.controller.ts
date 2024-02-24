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
import { BrandService } from './brand.service';
import { BrandDto } from './dto/brand.dto';
import { BrandUpdateDto } from './dto/brand.update';

@Controller('brands')
export class BrandController {
  constructor(private brandService: BrandService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.User, RolesEnum.Admin)
  @Post()
  public addBrand(@Body() dto: BrandDto) {
    return this.brandService.create(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.User, RolesEnum.Admin)
  @Get()
  public getCategories() {
    return this.brandService.getAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.User, RolesEnum.Admin)
  @Get(':id')
  public getBrandById(@Param('id', ParseIntPipe) id: number) {
    return this.brandService.getOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.User, RolesEnum.Admin)
  @Put(':id')
  public updateBrand(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: BrandUpdateDto,
  ) {
    return this.brandService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.User, RolesEnum.Admin)
  @Delete(':id')
  public deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return this.brandService.delete(id);
  }
}
