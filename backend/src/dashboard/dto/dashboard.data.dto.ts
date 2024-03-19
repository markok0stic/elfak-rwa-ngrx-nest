import { Product } from '../../product/entities/product.entity';
import { Sale } from '../../sale/entities/sale.entity';
import { ProductSalesDto } from './product.sales.dto';

export class DashboardDataDto {
  userCount: number;
  categoriesCount: number;
  productsCount: number;
  totalSales: number;
  totalProfit: string;
  bestSellingProducts: ProductSalesDto[];
  latestSales: Sale[];
  recentlyCreatedProducts: Product[];
}
