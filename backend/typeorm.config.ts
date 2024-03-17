import { DataSourceOptions } from 'typeorm';
import { User } from './src/user/entities/user.entity';
import { Category } from './src/category/entities/category.entity';
import { Product } from './src/product/entities/product.entity';
import { Sale } from './src/sale/entities/sale.entity';
import { SaleDetail } from './src/sale/entities/sale.details.entity';

export const typeOrmConfig: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 1111,
  username: 'user1',
  password: 'q2wortgy7e',
  database: 'db1',
  entities: [User, Category, Product, Sale, SaleDetail],
  synchronize: true,
};
