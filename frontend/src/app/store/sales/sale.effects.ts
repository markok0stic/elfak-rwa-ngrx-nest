import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as SaleActions from './sale.actions';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as SalesActions from './sale.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationsService } from '../../services/notifications/notifications.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { SalesService } from '../../services/sales/sales.service';

@Injectable()
export class SaleEffects {

  loadSales$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SaleActions.loadSales),
      mergeMap(() =>
        this.salesService.getAllSales().pipe(
          map(sales => {
            sales.forEach(sale=> {
              sale.products = sale.saleDetails.map(detail =>
                `${detail.product.name} x${detail.quantity}`
              ).join("\n");
            })
            return SaleActions.loadSalesSuccess({ data:sales })
          }),
          catchError(error => {
            return of(SaleActions.loadSalesFailure({ error }))
          }),
        ),
      ),
    ),
  );

  createSales$ = createEffect(() => this.actions$.pipe(
    ofType(SalesActions.createSales),
    mergeMap(({ sale }) =>
      this.salesService.addSale(sale).pipe(
        map(() => {
          this.notificationsService.showSuccessSnackBar('Sale successfully created');
          return SalesActions.createSalesSuccess({ success: true });
        }),
        tap(() => {
          this.store.dispatch(SalesActions.loadSales());
        }),
        catchError((error: HttpErrorResponse) => {
          this.notificationsService.showErrorSnackBar(error.error);
          return of(SalesActions.createSalesFailure({ error: error.error.message }));
        }),
      ),
    ),
  ));


  deleteSales$ = createEffect(() => this.actions$.pipe(
    ofType(SalesActions.deleteSales),
    mergeMap(({ saleId }) =>
      this.salesService.deleteSale(saleId).pipe(
        map(() => {
          this.notificationsService.showSuccessSnackBar(`Sale with id: ${saleId} deleted successfully`);
          return SalesActions.deleteSalesSuccess({ saleId });
        }),
        tap(() => {
          this.store.dispatch(SalesActions.loadSales());
        }),
        catchError(error => {
          this.notificationsService.showErrorSnackBar(error.error);
          return of(SalesActions.deleteSalesFailure({ error }));
        }),
      ),
    ),
  ));

  constructor(
    private actions$: Actions,
    private salesService: SalesService,
    private notificationsService: NotificationsService,
    private store: Store<AppState>
  ) {
  }
}
