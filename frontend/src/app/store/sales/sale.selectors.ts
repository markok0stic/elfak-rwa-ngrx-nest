import { createSelector } from '@ngrx/store';
import { AppState } from '../../app.state';

export const selectFeature = (state: AppState) => state;

export const selectAllSales = createSelector(
  selectFeature,
  (state: AppState) => state.sales
);

export const selectSalesLoading = createSelector(
  selectFeature,
  (state: AppState) => state.sales.loading
);

export const selectSuccessfulSalesCreation = createSelector(
  selectFeature,
  (state: AppState) => state.sales.successfulCreation
);
