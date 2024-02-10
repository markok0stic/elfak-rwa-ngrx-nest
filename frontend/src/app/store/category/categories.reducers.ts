import { CategoriesState } from './categories.state';
import { createReducer, on } from '@ngrx/store';
import * as CategoryActions from './categories.actions';

export const initialState: CategoriesState = {
  data: [],
  loading: false,
  error: null,
};

export const categoriesReducers = createReducer(
  initialState,
  on(CategoryActions.loadCategories, state => ({ ...state, loading: true })),
  on(CategoryActions.loadCategoriesSuccess, (state, { categories }) => ({
    ...state,
    list: categories,
    loading: false,
  })),
  on(CategoryActions.loadCategoriesFailure, (state, { error }) => ({ ...state, error, loading: false })),
);
