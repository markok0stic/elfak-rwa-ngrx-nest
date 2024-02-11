import { StatusEnum } from '@shared/enums/status.enum';

export class SupplierDto {
  id: number;
  name: string;
  mobile: string;
  address: string;
  status: StatusEnum;
}
