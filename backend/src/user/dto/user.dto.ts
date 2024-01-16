import { RolesEnum } from '@shared/enums/roles.enum';

export class UserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  country: string;
  address: string;
  city: string;
  zip: string;
  role: RolesEnum;
}
