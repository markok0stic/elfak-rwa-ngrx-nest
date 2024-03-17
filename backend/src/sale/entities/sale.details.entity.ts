import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Sale } from './sale.entity';
import { Product } from '../../product/entities/product.entity';

@Entity()
export class SaleDetail {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(() => Sale, (sale) => sale.saleDetails, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'saleId' })
  public sale: Sale;

  @ManyToOne(() => Product, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'productId' })
  public product: Product;

  @Column({ type: 'int', nullable: false })
  public quantity: number;

  @Column({ type: 'float', nullable: false })
  public salesPrice: number;
}
