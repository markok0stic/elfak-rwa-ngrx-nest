import { createAction, props } from '@ngrx/store';
import { BrandModel } from '../../models/brand/brand.model';

export const loadBrands = createAction('[Brands] Load Brands');
export const loadBrandsSuccess = createAction('[Brands] Load Brands Success', props<{ brands: BrandModel[] }>());
export const loadBrandsFailure = createAction('[Brands] Load Brands Failure', props<{ error: any }>());

export const createBrands = createAction('[Brands] Create Brands', props<{ brand: BrandModel }>());
export const createBrandsSuccess = createAction('[Brands] Create Brands Success', props<{ success: boolean }>());
export const createBrandsFailure = createAction('[Brands] Create Brands Failure', props<{ error: any }>());

export const editBrands = createAction('[Brands] Edit Brands', props<{ brand: BrandModel }>());
export const editBrandsSuccess = createAction('[Brands] Edit Brands Success', props<{ brand: BrandModel }>());
export const editBrandsFailure = createAction('[Brands] Edit Brands Failure', props<{ error: any }>());

export const deleteBrands = createAction('[Brands] Delete Brands', props<{ brandId: number }>());
export const deleteBrandsSuccess = createAction('[Brands] Delete Brands Success', props<{ brandId: number }>());
export const deleteBrandsFailure = createAction('[Brands] Delete Brands Failure', props<{ error: any }>());
