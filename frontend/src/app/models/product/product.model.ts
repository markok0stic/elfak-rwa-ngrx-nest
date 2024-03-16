import { CategoryModel } from '../category/category.model';
import { BrandModel } from '../brand/brand.model';
import { ModelModel } from '../model/model.model';

export interface ProductModel {
  id: number;
  name: string;
  description: string;
  quantity: number;
  sku: string;
  purchasePrice: number;
  salesPrice: number;
  categoryName: string,
  brandName: string,
  modelName: string,
  category: CategoryModel;
  brand: BrandModel;
  model: ModelModel;
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
  brandId: number;
  modelId: number;
}

export interface UpdateProductModel {
  id: number;
  name: string;
  description: string;
  quantity: number;
  purchasePrice: number;
  salesPrice: number;
  categoryId: number;
  brandId: number;
  modelId: number;
}
