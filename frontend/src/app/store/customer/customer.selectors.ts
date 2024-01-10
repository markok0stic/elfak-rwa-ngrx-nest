import { createSelector } from '@ngrx/store';
import {AppState} from "../../app.state";
import {CustomerState} from "./customer.state";

export const selectCustomerState = (state: AppState) => state.customer;

export const selectAllCustomers = createSelector(
  selectCustomerState,
  (state: CustomerState) => state.customers
);

// Dodajte selektore za učitavanje, greške, i druge aspekte state-a...
