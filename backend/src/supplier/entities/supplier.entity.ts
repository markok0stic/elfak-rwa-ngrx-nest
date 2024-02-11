import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { StatusEnum } from '@shared/enums/status.enum';

@Entity()
export class Supplier {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', nullable: false })
  public name: string;

  @Column({ type: 'varchar', nullable: false })
  public mobile: string;

  @Column({ type: 'varchar', nullable: false })
  public address: string;

  @Column({ type: 'varchar', nullable: false, default: StatusEnum.Active })
  public status: StatusEnum;
}
