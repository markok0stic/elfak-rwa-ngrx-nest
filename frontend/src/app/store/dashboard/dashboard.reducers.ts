import { DashboardState } from './dashboard.state';
import { createReducer, on } from '@ngrx/store';
import * as DashboardActions from './dashboard.actions';

export const initialState: DashboardState = {
  loading: false,
  error: null
};

export const dashboardReducers = createReducer(
  initialState,
  on(DashboardActions.loadDashboardData, state => ({ ...state, loading: true })),
  on(DashboardActions.loadDashboardDataSuccess, (state, { data }) => ({
    ...state,
    data: data,
    loading: false,
  })),
  on(DashboardActions.loadDashboardDataFailure, (state, { error }) => ({ ...state, error, loading: false })),
);
