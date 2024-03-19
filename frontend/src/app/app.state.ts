import { CurrentUserState } from './store/current-user/current.user.state';
import { ProductState } from './store/product/product.state';
import { UsersState } from './store/users/users.state';
import { CategoriesState } from './store/categories/categories.state';
import { SaleState } from './store/sales/sale.state';
import { DashboardState } from './store/dashboard/dashboard.state';

export interface AppState {
  currentUser: CurrentUserState,
  users: UsersState,
  categories: CategoriesState,
  products: ProductState,
  sales: SaleState,
  dashboard: DashboardState
}
