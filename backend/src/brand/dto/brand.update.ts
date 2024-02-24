import { StatusEnum } from '@shared/enums/status.enum';

export class BrandUpdateDto {
  id: number;
  name: string;
  status: StatusEnum;
}
