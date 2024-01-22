import { createSelector } from '@ngrx/store';
import { AppState } from '../../app.state';

export const selectFeature = (state: AppState) => state;

export const selectAllUsers = createSelector(selectFeature,
  (state) => state.users
);

export const selectSuccessfulRegistrationData = createSelector(selectFeature,
  (state) => state.users.registration,
);
