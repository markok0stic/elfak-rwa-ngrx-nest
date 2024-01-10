import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../../enums/role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'text', nullable: false })
  public firstName: string;

  @Column({ type: 'text', nullable: false })
  public lastName: string;

  @Column({ type: 'text', nullable: false, unique: true })
  public email: string;

  @Column({ type: 'text', nullable: false })
  public password: string;

  @Column({ type: 'text', nullable: false })
  public phone: string;

  @Column({ type: 'text', nullable: true })
  public address: string;

  @Column({ type: 'text', nullable: true })
  public city: string;

  @Column({ type: 'number', nullable: true })
  public zip: string;

  @Column({ type: 'text', nullable: false, default: Role.User })
  public role: string;
}
