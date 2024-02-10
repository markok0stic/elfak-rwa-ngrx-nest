import { CurrentUserState } from './store/current-user/current.user.state';
import { ProductState } from './store/product/product.state';
import { OrderState } from './store/order/order.state';
import { CustomerState } from './store/customer/customer.state';
import { UsersState } from './store/users/users.state';
import { CategoriesState } from './store/categories/categories.state';

export interface AppState {
  currentUser: CurrentUserState,
  product: ProductState,
  order: OrderState,
  customer: CustomerState,
  users: UsersState,
  categories: CategoriesState
}
