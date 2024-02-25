import { StatusEnum } from '@shared/enums/status.enum';

export class ModelUpdateDto {
  id: number;
  name: string;
  status: StatusEnum;
}
