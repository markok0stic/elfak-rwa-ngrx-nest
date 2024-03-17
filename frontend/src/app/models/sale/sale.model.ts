import { ProductModel } from '../product/product.model';

export interface SaleModel {
  id: number;
  total: number;
  createdOn: Date;
  products: string;
  saleDate: string;
  saleDetails: SaleDetailModel[]
}

export interface SaleDetailModel {
  id: number;
  quantity: number;
  salesPrice: number;
  product: ProductModel
}

export interface CreateSaleModel {
  saleDetails: CreateSaleDetailModel[];
}

export interface CreateSaleDetailModel {
  productId: number;
  quantity: number;
  salesPrice: number;
}
