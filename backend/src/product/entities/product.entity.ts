import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', nullable: false })
  public name: string;

  @Column({ type: 'varchar', nullable: true })
  public description: string;

  @Column({ type: 'int', nullable: false })
  public quantity: string;

}