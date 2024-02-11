import { DataSourceOptions } from 'typeorm';
import { User } from './src/user/entities/user.entity';
import { Category } from './src/category/entities/category.entity';
import { Supplier } from './src/supplier/entities/supplier.entity';

export const typeOrmConfig: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 1111,
  username: 'user1',
  password: 'q2wortgy7e',
  database: 'db1',
  entities: [User, Category, Supplier],
  synchronize: true,
};
