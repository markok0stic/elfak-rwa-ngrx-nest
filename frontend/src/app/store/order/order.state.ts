import {OrderModel} from "../../models/order/order.model";

export interface OrderState {
  orders: OrderModel[];
  loading: boolean;
  error: any;
}
