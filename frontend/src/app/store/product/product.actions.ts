import { createAction, props } from '@ngrx/store';
import { ProductModel } from '../../models/product/product.model';

export const requestLoadProducts = createAction('[ProductModel] Request Load Products',
);

export const loadProductsSuccess = createAction('[ProductModel] Load Products Success',
  props<{ products: ProductModel[] }>(),
);

export const loadProductsFailure = createAction('[ProductModel] Load Products Failure',
  props<{ error: any }>(),
);

export const requestAddProduct = createAction('[ProductModel] Request Add ProductModel',
  props<{ product: ProductModel }>(),
);

export const addProductSuccess = createAction('[ProductModel] Add ProductModel Success',
  props<{ product: ProductModel }>(),
);

export const addProductFailure = createAction('[ProductModel] Add ProductModel Failure',
  props<{ error: any }>(),
);

