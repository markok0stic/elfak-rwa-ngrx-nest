import { ProductSalesModel } from './product.sales.model';
import { SaleModel } from '../sale/sale.model';
import { ProductModel } from '../product/product.model';

export interface DashboardModel {
  userCount: number;
  categoriesCount: number;
  productsCount: number;
  totalSales: number;
  totalProfit: string;
  bestSellingProducts: ProductSalesModel[];
  latestSales: SaleModel[];
  recentlyCreatedProducts: ProductModel[];
}
