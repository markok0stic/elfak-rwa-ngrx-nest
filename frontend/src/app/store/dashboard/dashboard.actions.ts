import { createAction, props } from '@ngrx/store';
import { DashboardModel } from '../../models/dashboard/dashboard.model';

export const loadDashboardData = createAction('[Dashboard] Load Dashboard Data');
export const loadDashboardDataSuccess = createAction('[Dashboard] Load Dashboard Data Success', props<{
  data: DashboardModel
}>());
export const loadDashboardDataFailure = createAction('[Dashboard] Load Dashboard Data Failure', props<{ error: any }>());
