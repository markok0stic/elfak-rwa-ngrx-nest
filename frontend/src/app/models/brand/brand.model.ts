import { StatusEnum } from '@shared/enums/status.enum';

export interface BrandModel {
  id: number;
  name: string;
  status: StatusEnum;
}
