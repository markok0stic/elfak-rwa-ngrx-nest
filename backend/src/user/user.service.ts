import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { SALT_ROUNDS } from '../../helper-config';
import { UserUpdateDto } from './dto/user-update.dto';
import * as bcrypt from 'bcrypt';
import { RolesEnum } from '../enums/roles.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  public async create(userDto): Promise<User | undefined> {
    const { email, password } = userDto;

    if (!email || !password) {
      throw new BadRequestException('MissingFields');
    }

    if (await this.findOne(email)) {
      throw new BadRequestException('EmailAlreadyRegistered');
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = {
      firstName: userDto.firstName,
      lastName: userDto.lastName,
      phone: userDto.phone,
      address: userDto.address,
      city: userDto.city,
      zip: userDto.zip,
      email: email,
      password: hashedPassword,
      role: userDto.role,
    };

    return this.userRepository.save(user);
  }

  public async editProfile(accessUser: User, dto: UserUpdateDto) {
    const { firstName, lastName, address, phone } = dto;

    const user: User = await this.userRepository.findOne({
      where: { id: accessUser.id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        address: true,
        phone: true,
        role: true,
        city: true,
        zip: true,
      },
    });

    if (!user) throw new BadRequestException('InvalidUser');

    user.firstName = firstName;
    user.lastName = lastName;
    user.address = address;
    user.phone = phone;

    if (!(await this.userRepository.update(user.id, user)))
      return { success: false };

    return user;
  }

  public async findOne(email: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ email: email });
  }

  public getAll() {
    return this.userRepository.find();
  }

  public async delete(id: number) {
    return await this.userRepository.delete(id);
  }
}
