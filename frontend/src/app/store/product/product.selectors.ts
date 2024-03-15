import { createSelector } from '@ngrx/store';
import { AppState } from '../../app.state';

export const selectFeature = (state: AppState) => state;

export const selectAllProducts = createSelector(
  selectFeature,
  (state: AppState) => state.products
);

export const selectProductsLoading = createSelector(
  selectFeature,
  (state: AppState) => state.products.loading
);

export const selectSuccessfulProductCreation = createSelector(
  selectFeature,
  (state: AppState) => state.products.successfulCreation
);
