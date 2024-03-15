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
import { ProductDto } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @Roles(RolesEnum.User, RolesEnum.Admin)
  public create(@Body() dto: ProductDto) {
    return this.productService.create(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put()
  @Roles(RolesEnum.User, RolesEnum.Admin)
  public update(@Body() dto: ProductDto) {
    return this.productService.update(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  @Roles(RolesEnum.User, RolesEnum.Admin)
  public getOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.getOne(id);
  }

  @Get()
  public get() {
    return this.productService.getAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  @Roles(RolesEnum.User, RolesEnum.Admin)
  public delete(@Param('id', ParseIntPipe) id: number) {
    return this.productService.delete(id);
  }
}
