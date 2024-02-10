import { createSelector } from '@ngrx/store';
import { AppState } from '../../app.state';

export const selectCategories = (state: AppState) => state.categories;

export const selectAllCategories = createSelector(
  selectCategories,
  (state) => state.data,
);
