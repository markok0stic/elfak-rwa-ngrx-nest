import { DataSourceOptions } from 'typeorm';
import { User } from './src/user/entities/user.entity';

export const typeOrmConfig: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 1111,
  username: 'users',
  password: 'root',
  database: 'db1',
  entities: [User],
  synchronize: true,
};
