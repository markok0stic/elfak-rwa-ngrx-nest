import { createReducer, on } from '@ngrx/store';
import * as ProductActions from './product.actions';
import { ProductState } from './product.state';

export const initialProductState: ProductState = {
  data: [],
  loading: false,
  error: null,
  successfulCreation: null
};

export const productReducers = createReducer(
  initialProductState,
  on(ProductActions.loadProducts, state => ({ ...state, loading: true })),
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
  on(ProductActions.createProducts, state => ({
    ...state,
    loading: true,
    successfulCreation: null
  })),
  on(ProductActions.createProductsSuccess, (state) => ({
    ...state,
    loading: false,
    successfulCreation: true
  })),
  on(ProductActions.createProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    successfulCreation: false,
    error: error
  })),
  on(ProductActions.editProducts, state => ({
    ...state,
    loading: true
  })),
  on(ProductActions.editProductsSuccess, (state, { product }) => ({
    ...state,
    loading: false
  })),
  on(ProductActions.editProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  })),
  on(ProductActions.deleteProducts, state => ({
    ...state,
    loading: true
  })),
  on(ProductActions.deleteProductsSuccess, (state, { productId }) => ({
    ...state,
    loading: false
  })),
  on(ProductActions.deleteProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  }))
);
