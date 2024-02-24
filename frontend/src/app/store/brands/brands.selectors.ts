import { createSelector } from '@ngrx/store';
import { AppState } from '../../app.state';

export const selectFeature = (state: AppState) => state;

export const selectAllBrands = createSelector(
  selectFeature,
  (state: AppState) => state.brands
);

export const selectBrandsLoading = createSelector(
  selectFeature,
  (state: AppState) => state.brands.loading
);

export const selectSuccessfulBrandCreation = createSelector(
  selectFeature,
  (state: AppState) => state.brands.successfulCreation
);
