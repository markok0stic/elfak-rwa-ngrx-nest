import { createSelector } from '@ngrx/store';
import { AppState } from '../../app.state';

export const selectFeature = (state: AppState) => state;

export const selectAllModels = createSelector(
  selectFeature,
  (state: AppState) => state.models
);

export const selectModelsLoading = createSelector(
  selectFeature,
  (state: AppState) => state.models.loading
);

export const selectSuccessfulModelCreation = createSelector(
  selectFeature,
  (state: AppState) => state.models.successfulCreation
);
