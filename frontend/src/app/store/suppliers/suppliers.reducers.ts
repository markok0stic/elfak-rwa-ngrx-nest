import { createReducer, on } from '@ngrx/store';
import * as SuppliersActions from './suppliers.actions';
import { SuppliersState } from './suppliers.state';

export const initialState: SuppliersState = {
  data: [],
  loading: false,
  error: null,
  successfulCreation: null,
};

export const suppliersReducers = createReducer(
  initialState,
  on(SuppliersActions.loadSuppliers, state => ({ ...state, loading: true })),
  on(SuppliersActions.loadSuppliersSuccess, (state, { suppliers }) => ({
    ...state,
    data: suppliers,
    loading: false,
  })),
  on(SuppliersActions.loadSuppliersFailure, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
  })),
  on(SuppliersActions.createSupplier, state => ({
    ...state,
    loading: true,
    successfulCreation: null
  })),
  on(SuppliersActions.createSupplierSuccess, (state) => ({
    ...state,
    loading: false,
    successfulCreation: true
  })),
  on(SuppliersActions.createSupplierFailure, (state, { error }) => ({
    ...state,
    loading: false,
    successfulCreation: false,
    error: error
  })),
  on(SuppliersActions.editSupplier, state => ({
    ...state,
    loading: true
  })),
  on(SuppliersActions.editSupplierSuccess, (state, { supplier }) => ({
    ...state,
    loading: false
  })),
  on(SuppliersActions.editSupplierFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  })),
  on(SuppliersActions.deleteSupplier, state => ({
    ...state,
    loading: true
  })),
  on(SuppliersActions.deleteSupplierSuccess, (state, { supplierId }) => ({
    ...state,
    loading: false
  })),
  on(SuppliersActions.deleteSupplierFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  }))
);

