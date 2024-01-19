import { createReducer, on } from '@ngrx/store';
import * as OrderActions from './order.actions';
import { OrderState } from './order.state';

export const initialOrderState: OrderState = {
  orders: [],
  loading: false,
  error: null,
};

export const orderReducers = createReducer(
  initialOrderState,
  on(OrderActions.requestLoadOrders, state => ({ ...state, loading: true })),
  on(OrderActions.loadOrdersSuccess, (state, { orders }) => ({
    ...state,
    orders: orders,
    loading: false,
  })),
  on(OrderActions.loadOrdersFailure, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
  })),
  // Handle actions for creating, updating, and deleting orders...
);
