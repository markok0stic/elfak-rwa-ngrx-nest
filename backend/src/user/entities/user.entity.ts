import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../../enums/role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', nullable: false })
  public firstName: string;

  @Column({ type: 'varchar', nullable: false })
  public lastName: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  public email: string;

  @Column({ type: 'varchar', nullable: false })
  public password: string;

  @Column({ type: 'varchar', nullable: false })
  public phone: string;

  @Column({ type: 'varchar', nullable: true })
  public address: string;

  @Column({ type: 'varchar', nullable: true })
  public city: string;

  @Column({ type: 'int', nullable: true })
  public zip: string;

  @Column({ type: 'varchar', nullable: false, default: Role.User })
  public role: string;
}
