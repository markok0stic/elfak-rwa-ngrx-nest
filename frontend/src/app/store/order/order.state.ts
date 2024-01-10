import {Order} from "../../models/order/order";

export interface OrderState {
  orders: Order[];
  loading: boolean;
  error: any;
}
