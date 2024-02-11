import { StatusEnum } from '@shared/enums/status.enum';

export interface SupplierModel {
  id: number;
  name: string;
  mobile: string;
  address: string;
  status: StatusEnum;
}
