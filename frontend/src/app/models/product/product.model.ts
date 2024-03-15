import { CategoryModel } from '../category/category.model';
import { BrandModel } from '../brand/brand.model';
import { ModelModel } from '../model/model.model';

export interface ProductModel {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  sku: string;
  category: CategoryModel;
  brand: BrandModel;
  model: ModelModel;
}
