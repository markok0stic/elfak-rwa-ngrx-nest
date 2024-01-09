import {createSelector} from "@ngrx/store";
import {AppState} from "../../app.state";

export const selectFeature = (state: AppState) => state.user;
export const isLoadingSelector = createSelector(selectFeature,
  (state) => state.isLoading);
export const selectUser = createSelector(selectFeature,
  (state) => state.user);
