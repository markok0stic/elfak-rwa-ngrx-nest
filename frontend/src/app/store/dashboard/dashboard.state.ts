import { DashboardModel } from '../../models/dashboard/dashboard.model';

export type DashboardState = {
  data?: DashboardModel,
  loading: boolean,
  error: any
}
