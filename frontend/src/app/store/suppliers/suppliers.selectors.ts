import { createSelector } from '@ngrx/store';
import { AppState } from '../../app.state';

export const selectFeature = (state: AppState) => state;

export const selectAllSuppliers = createSelector(
  selectFeature,
  (state: AppState) => state.suppliers
);

export const selectSuppliersLoading = createSelector(
  selectFeature,
  (state: AppState) => state.suppliers.loading
);

export const selectSuccessfulSupplierCreation = createSelector(
  selectFeature,
  (state: AppState) => state.suppliers.successfulCreation
);
