import { State } from '../../models/state';
import { ModelModel } from '../../models/model/model.model';
import { ProductModel } from '../../models/product/product.model';

export type ProductState = State<ProductModel> & {
  successfulCreation: boolean | null;
}
