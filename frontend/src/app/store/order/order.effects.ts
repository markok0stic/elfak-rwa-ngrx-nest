import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as OrderActions from './order.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {OrdersService} from "../../services/orders/orders.service";

@Injectable()
export class OrderEffects {

  loadOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.requestLoadOrders),
      mergeMap(() =>
        this.orderService.getOrders().pipe(
          map(orders => OrderActions.loadOrdersSuccess({ orders })),
          catchError(error => of(OrderActions.loadOrdersFailure({ error })))
        )
      )
    )
  );

  // Define effects for creating, updating, and deleting orders...

  constructor(
    private actions$: Actions,
    private orderService: OrdersService
  ) {}
}
