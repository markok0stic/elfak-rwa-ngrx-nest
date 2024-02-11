import { CategoriesState } from './categories.state';
import { createReducer, on } from '@ngrx/store';
import * as CategoryActions from './categories.actions';

export const initialState: CategoriesState = {
  data: [],
  loading: false,
  error: null,
  successfulCreation: null
};

export const categoriesReducers = createReducer(
  initialState,
  on(CategoryActions.loadCategories, state => ({ ...state, loading: true })),
  on(CategoryActions.loadCategoriesSuccess, (state, { categories }) => ({
    ...state,
    data: categories,
    loading: false,
  })),
  on(CategoryActions.loadCategoriesFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(CategoryActions.createCategory, (state, { category }) => ({ ...state, loading: true, successfulCreation: null })),
  on(CategoryActions.createCategorySuccess, (state, { success }) => ({ ...state, loading: false, successfulCreation: success })),
  on(CategoryActions.createCategoryFailure, (state, { error }) => ({ ...state, loading: false, successfulCreation: null })),
  on(CategoryActions.editCategory, (state) => ({...state, loading: true})),
  on(CategoryActions.editCategorySuccess, (state) => ({...state, loading: false})),
  on(CategoryActions.editCategoryFailure, (state, {error}) => ({...state, error, loading: false})),
  on(CategoryActions.deleteCategory, (state) => ({...state, loading: true})),
  on(CategoryActions.deleteCategorySuccess, (state) => ({...state, loading: false}))
);
