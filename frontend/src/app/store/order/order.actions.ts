import { createAction, props } from '@ngrx/store';
import { OrderModel } from '../../models/order/order.model';

export const requestLoadOrders = createAction('[OrderModel] Request Load Orders');
export const loadOrdersSuccess = createAction('[OrderModel] Load Orders Success',
  props<{ orders: OrderModel[] }>(),
);

export const loadOrdersFailure = createAction('[OrderModel] Load Orders Failure',
  props<{ error: any }>(),
);

export const requestCreateOrder = createAction('[OrderModel] Request Create OrderModel',
  props<{ order: OrderModel }>(),
);

export const createOrderSuccess = createAction('[OrderModel] Create OrderModel Success',
  props<{ order: OrderModel }>(),
);

export const createOrderFailure = createAction('[OrderModel] Create OrderModel Failure',
  props<{ error: any }>());

// Dodajte akcije za ažuriranje, brisanje i specifične operacije vezane za narudžbine...
