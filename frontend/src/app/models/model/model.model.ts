import { StatusEnum } from '@shared/enums/status.enum';

export interface ModelModel {
  id: number;
  name: string;
  status: StatusEnum;
}
