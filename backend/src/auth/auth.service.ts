import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { JWT_SECRET } from '../../helper-config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);

    if (!user) {
      return null;
    }

    if (!(await bcrypt.compare(pass, user.password))) {
      return null;
    }

    const { password, ...result } = user;

    return result;
  }

  async login(user: User) {
    const payload = { id: user.id, email: user.email, role: user.role };
    return {
      user,
      accessToken: this.jwtService.sign(payload, {
        secret: JWT_SECRET.secret,
      }),
    };
  }
}
