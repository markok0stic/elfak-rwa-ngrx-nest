import { CategoryModel } from '../category/category.model';

export interface ProductModel {
  id: number;
  name: string;
  description: string;
  quantity: number;
  sku: string;
  purchasePrice: number;
  salesPrice: number;
  categoryName: string,
  category: CategoryModel;
  createdOn: number;
}

export interface CreateProductModel {
  sku: string;
  quantity: number;
  name: string;
  description: string;
  purchasePrice: number;
  salesPrice: number;
  categoryId: number;
}

export interface UpdateProductModel {
  id: number;
  name: string;
  description: string;
  quantity: number;
  purchasePrice: number;
  salesPrice: number;
  categoryId: number;
}
