import { DataSourceOptions } from 'typeorm';

export const typeOrmConfig: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 1111,
  username: 'users',
  password: 'root',
  database: 'db1',
  entities: [],
  synchronize: true,
};
