import {ProductModel} from "../../models/product/product.model";

export interface ProductState {
  products: ProductModel[];
  loading: boolean;
  error: any;
}
