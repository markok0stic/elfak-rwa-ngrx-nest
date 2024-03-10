import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import { Brand } from '../../brand/entities/brand.entity';
import { Model } from '../../model/entities/model.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', nullable: false, unique: true })
  public sku: string;

  @Column({ type: 'int', nullable: false })
  public quantity: string;

  @Column({ type: 'varchar', nullable: false })
  public name: string;

  @Column({ type: 'varchar', nullable: true })
  public description: string;

  @ManyToOne(() => Category, (category: Category) => category.products, {
    onDelete: 'CASCADE',
  })
  public category: Category;

  @ManyToOne(() => Brand, (brand: Brand) => brand.products, {
    onDelete: 'CASCADE',
  })
  public brand: Brand;

  @ManyToOne(() => Model, (model: Model) => model.products, {
    onDelete: 'CASCADE',
  })
  public model: Model;
}
