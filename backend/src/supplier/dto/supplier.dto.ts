import { StatusEnum } from '@shared/enums/status.enum';

export class SupplierDto {
  name: string;
  mobile: string;
  address: string;
  status: StatusEnum;
}
