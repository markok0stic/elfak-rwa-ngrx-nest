import { createSelector } from '@ngrx/store';
import {AppState} from "../../app.state";
import {OrderState} from "./order.state";

export const selectOrderState = (state: AppState) => state.order;

export const selectAllOrders = createSelector(
  selectOrderState,
  (state: OrderState) => state.orders
);

// Dodajte selektore za učitavanje, greške, i druge aspekte state-a...
