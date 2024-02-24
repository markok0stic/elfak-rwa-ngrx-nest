import { createReducer, on } from '@ngrx/store';
import * as BrandsActions from './brands.actions';
import { BrandsState } from './brands.state';

export const initialState: BrandsState = {
  data: [],
  loading: false,
  error: null,
  successfulCreation: null,
};

export const brandsReducers = createReducer(
  initialState,
  on(BrandsActions.loadBrands, state => ({ ...state, loading: true })),
  on(BrandsActions.loadBrandsSuccess, (state, { brands }) => ({
    ...state,
    data: brands,
    loading: false,
  })),
  on(BrandsActions.loadBrandsFailure, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
  })),
  on(BrandsActions.createBrands, state => ({
    ...state,
    loading: true,
    successfulCreation: null
  })),
  on(BrandsActions.createBrandsSuccess, (state) => ({
    ...state,
    loading: false,
    successfulCreation: true
  })),
  on(BrandsActions.createBrandsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    successfulCreation: false,
    error: error
  })),
  on(BrandsActions.editBrands, state => ({
    ...state,
    loading: true
  })),
  on(BrandsActions.editBrandsSuccess, (state, { brand }) => ({
    ...state,
    loading: false
  })),
  on(BrandsActions.editBrandsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  })),
  on(BrandsActions.deleteBrands, state => ({
    ...state,
    loading: true
  })),
  on(BrandsActions.deleteBrandsSuccess, (state, { brandId }) => ({
    ...state,
    loading: false
  })),
  on(BrandsActions.deleteBrandsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  }))
);

