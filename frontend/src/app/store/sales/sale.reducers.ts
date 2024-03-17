import { createReducer, on } from '@ngrx/store';
import * as SaleActions from './sale.actions';
import { SaleState } from './sale.state';

export const initialSaleState: SaleState = {
  data: [],
  loading: false,
  error: null,
  successfulCreation: null
};

export const saleReducers = createReducer(
  initialSaleState,
  on(SaleActions.loadSales, state => ({ ...state, loading: true })),
  on(SaleActions.loadSalesSuccess, (state, { data }) => ({
    ...state,
    data: data,
    loading: false,
  })),
  on(SaleActions.loadSalesFailure, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
  })),
  on(SaleActions.createSales, state => ({
    ...state,
    loading: true,
    successfulCreation: null
  })),
  on(SaleActions.createSalesSuccess, (state) => ({
    ...state,
    loading: false,
    successfulCreation: true
  })),
  on(SaleActions.createSalesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    successfulCreation: false,
    error: error
  })),
  on(SaleActions.deleteSales, state => ({
    ...state,
    loading: true
  })),
  on(SaleActions.deleteSalesSuccess, (state, { saleId }) => ({
    ...state,
    loading: false
  })),
  on(SaleActions.deleteSalesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  }))
);
