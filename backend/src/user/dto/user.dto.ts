import { RolesEnum } from '../../enums/roles.enum';

export class UserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  city: string;
  zip: number;
  role: RolesEnum;
}
