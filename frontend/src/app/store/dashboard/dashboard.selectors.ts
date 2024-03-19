import { createSelector } from '@ngrx/store';
import { AppState } from '../../app.state';

export const selectFeature = (state: AppState) => state.dashboard;

export const selectDashboardData = createSelector(
  selectFeature,
  (state) => state.data,
);

export const isDashboardDataLoadingSelector = createSelector(
  selectFeature,
  (state) => state.loading
)
