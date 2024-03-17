import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SaleDetail } from './sale.details.entity';

@Entity()
export class Sale {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'timestamp', nullable: false })
  public createdOn: Date;

  @Column({ type: 'float', nullable: false })
  public total: number;

  @OneToMany(() => SaleDetail, (saleDetail) => saleDetail.sale)
  public saleDetails: SaleDetail[];
}
