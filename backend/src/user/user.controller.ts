import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { AuthService } from '../auth/auth.service';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { UserUpdateDto } from './dto/user-update.dto';
import { Roles } from '../auth/roles.decorator';
import { RolesEnum } from '@shared/enums/roles.enum';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.Admin)
  @Post('register')
  public addUser(@Body() dto: UserDto) {
    return this.userService.create(dto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('edit-profile')
  @Roles(RolesEnum.User, RolesEnum.Admin)
  public edit(@Request() req, @Body() dto: UserUpdateDto) {
    return this.userService.editProfile(req.user, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  public getProfile(@Request() req) {
    return req.user;
  }

  @Get()
  public getUsers() {
    return this.userService.getAll();
  }

  @Delete(':id')
  public deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
