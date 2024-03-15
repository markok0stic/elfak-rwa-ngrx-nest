import { createAction, props } from '@ngrx/store';
import { ProductModel } from '../../models/product/product.model';

export const loadProducts = createAction('[Products] Load Products');
export const loadProductsSuccess = createAction('[Products] Load Products Success', props<{ products: ProductModel[] }>());
export const loadProductsFailure = createAction('[Products] Load Products Failure', props<{ error: any }>());

export const createProducts = createAction('[Products] Create Products', props<{ product: ProductModel }>());
export const createProductsSuccess = createAction('[Products] Create Products Success', props<{ success: boolean }>());
export const createProductsFailure = createAction('[Products] Create Products Failure', props<{ error: any }>());

export const editProducts = createAction('[Products] Edit Products', props<{ product: ProductModel }>());
export const editProductsSuccess = createAction('[Products] Edit Products Success', props<{ product: ProductModel }>());
export const editProductsFailure = createAction('[Products] Edit Products Failure', props<{ error: any }>());

export const deleteProducts = createAction('[Products] Delete Products', props<{ productId: number }>());
export const deleteProductsSuccess = createAction('[Products] Delete Products Success', props<{ productId: number }>());
export const deleteProductsFailure = createAction('[Products] Delete Products Failure', props<{ error: any }>());
