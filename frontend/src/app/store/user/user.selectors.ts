import { createSelector } from '@ngrx/store';
import { AppState } from '../../app.state';

export const selectFeature = (state: AppState) => state.user;

export const isUserLoadingSelector = createSelector(selectFeature,
  (state) => state.isLoading);

export const selectUser = createSelector(selectFeature,
  (state) => state.user);

export const isUserLoggedIn = createSelector(selectFeature,
  (state) => !!state.accessToken,
);

export const selectLoggedInUserRole = createSelector(selectFeature,
  (state) => state.user?.role ?? null,
);

export const selectSuccessfulRegistrationData = createSelector(selectFeature,
  (state) => state.registration,
);
