import { createAction, props } from '@ngrx/store';
import {Order} from "../../models/order/order";

export const requestLoadOrders = createAction('[Order] Request Load Orders');
export const loadOrdersSuccess = createAction('[Order] Load Orders Success',
  props<{ orders: Order[] }>()
);

export const loadOrdersFailure = createAction('[Order] Load Orders Failure',
  props<{ error: any }>()
);

export const requestCreateOrder = createAction('[Order] Request Create Order',
  props<{ order: Order }>()
);

export const createOrderSuccess = createAction('[Order] Create Order Success',
  props<{ order: Order }>()
);

export const createOrderFailure = createAction('[Order] Create Order Failure',
  props<{ error: any }>());

// Dodajte akcije za ažuriranje, brisanje i specifične operacije vezane za narudžbine...
