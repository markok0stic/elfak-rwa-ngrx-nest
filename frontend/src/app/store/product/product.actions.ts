import {createAction, props} from '@ngrx/store';
import {Product} from "../../models/product/product";

export const requestLoadProducts = createAction('[Product] Request Load Products'
);

export const loadProductsSuccess = createAction('[Product] Load Products Success',
  props<{ products: Product[] }>()
);

export const loadProductsFailure = createAction('[Product] Load Products Failure',
  props<{ error: any }>()
);

export const requestAddProduct = createAction('[Product] Request Add Product',
  props<{ product: Product }>()
);

export const addProductSuccess = createAction('[Product] Add Product Success',
  props<{ product: Product }>()
);

export const addProductFailure = createAction('[Product] Add Product Failure',
  props<{ error: any }>()
);

