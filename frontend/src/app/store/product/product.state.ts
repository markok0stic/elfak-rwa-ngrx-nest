import { State } from '../../models/state';
import { ProductModel } from '../../models/product/product.model';

export type ProductState = State<ProductModel> & {
  successfulCreation: boolean | null;
}
