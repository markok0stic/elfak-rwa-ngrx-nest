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
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';
import { CategoryUpdateDto } from './dto/category.update';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.User, RolesEnum.Admin)
  @Post()
  public addCategory(@Body() dto: CategoryDto) {
    return this.categoryService.create(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.User, RolesEnum.Admin)
  @Get()
  public getCategories() {
    return this.categoryService.getAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.User, RolesEnum.Admin)
  @Get(':id')
  public getCategoryById(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.getOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.User, RolesEnum.Admin)
  @Put(':id')
  public updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CategoryUpdateDto,
  ) {
    return this.categoryService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.User, RolesEnum.Admin)
  @Delete(':id')
  public deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.delete(id);
  }
}
