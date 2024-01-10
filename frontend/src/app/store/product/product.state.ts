import {Product} from "../../models/product/product";

export interface ProductState {
  products: Product[];
  loading: boolean;
  error: any;
}
