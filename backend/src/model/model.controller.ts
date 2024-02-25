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
import { ModelService } from './model.service';
import { ModelDto } from './dto/model.dto';
import { ModelUpdateDto } from './dto/model.update';

@Controller('models')
export class ModelController {
  constructor(private modelService: ModelService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.User, RolesEnum.Admin)
  @Post()
  public addModel(@Body() dto: ModelDto) {
    return this.modelService.create(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.User, RolesEnum.Admin)
  @Get()
  public getCategories() {
    return this.modelService.getAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.User, RolesEnum.Admin)
  @Get(':id')
  public getModelById(@Param('id', ParseIntPipe) id: number) {
    return this.modelService.getOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.User, RolesEnum.Admin)
  @Put(':id')
  public updateModel(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ModelUpdateDto,
  ) {
    return this.modelService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.User, RolesEnum.Admin)
  @Delete(':id')
  public deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return this.modelService.delete(id);
  }
}
