import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../../category/entities/category.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', nullable: false, unique: true })
  public sku: string;

  @Column({ type: 'timestamp', nullable: false })
  public createdOn: Date;

  @Column({ type: 'int', nullable: false })
  public quantity: number;

  @Column({ type: 'float', nullable: false })
  public purchasePrice: number;

  @Column({ type: 'float', nullable: false })
  public salesPrice: number;

  @Column({ type: 'varchar', nullable: false })
  public name: string;

  @Column({ type: 'longtext', nullable: true })
  public description: string;

  @ManyToOne(() => Category, (category: Category) => category.products, {
    onDelete: 'CASCADE',
  })
  public category: Category;
}
