import { createReducer, on } from '@ngrx/store';
import * as ProductActions from './product.actions';
import { ProductState } from './product.state';

export const initialProductState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

export const productReducers = createReducer(
  initialProductState,
  on(ProductActions.requestLoadProducts, state => ({ ...state, loading: true })),
  on(ProductActions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    products: products,
    loading: false,
  })),
  on(ProductActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
  })),
  // Handle addProduct actions...
);
