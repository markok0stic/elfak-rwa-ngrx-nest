import { createSelector } from '@ngrx/store';
import { AppState } from '../../app.state';

export const selectFeature = (state: AppState) => state;

export const selectAllCategories = createSelector(
  selectFeature,
  (state) => state.categories,
);

export const isCategoriesLoadingSelector = createSelector(
  selectFeature,
  (state) => state.categories.loading
)

export const selectSuccessfulCategoryCreation = createSelector(
  selectFeature,
  (state) => state.categories.successfulCreation
)
