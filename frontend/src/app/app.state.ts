import {UserState} from "./store/user/user.state";
import {ProductState} from "./store/product/product.state";
import {OrderState} from "./store/order/order.state";
import {CustomerState} from "./store/customer/customer.state";

export interface AppState{
  user: UserState,
  product: ProductState,
  order: OrderState,
  customer: CustomerState,
}

