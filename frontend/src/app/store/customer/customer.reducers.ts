import { createReducer, on } from '@ngrx/store';
import * as CustomerActions from './customer.actions';
import { CustomerState } from './customer.state';

export const initialCustomerState: CustomerState = {
  customers: [],
  loading: false,
  error: null,
};

export const customerReducers = createReducer(
  initialCustomerState,
  on(CustomerActions.requestLoadCustomers, state => ({ ...state, loading: true })),
  on(CustomerActions.loadCustomersSuccess, (state, { customers }) => ({
    ...state,
    customers: customers,
    loading: false,
  })),
  on(CustomerActions.loadCustomersFailure, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
  })),
  // Obrada dodatnih akcija...
);
