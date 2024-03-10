import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StatusEnum } from '@shared/enums/status.enum';
import { Product } from '../../product/entities/product.entity';

@Entity()
export class Brand {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', nullable: false })
  public name: string;

  @Column({ type: 'varchar', nullable: false, default: StatusEnum.Active })
  public status: StatusEnum;

  @OneToMany(() => Product, (product: Product) => product.brand)
  public products: Product[];
}
