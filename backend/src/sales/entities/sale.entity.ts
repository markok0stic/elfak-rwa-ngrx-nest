import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Sale {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'timestamp', nullable: false })
  public createdOn: Date;
}
