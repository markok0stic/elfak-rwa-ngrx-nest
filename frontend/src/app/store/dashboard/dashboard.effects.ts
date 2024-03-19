import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as DashboardActions from './dashboard.actions';
import { NotificationsService } from '../../services/notifications/notifications.service';
import { DashboardService } from '../../services/dashboard/dashboard.service';

@Injectable()
export class DashboardEffects {
  loadCategories$ = createEffect(() => this._actions$.pipe(
    ofType(DashboardActions.loadDashboardData),
    mergeMap(() => this._dashboardService.getDashboardData().pipe(
      map(data => {
        data.latestSales.forEach(sale=> {
          sale.products = sale.saleDetails.map(detail =>
            `${detail.product.name} x${detail.quantity}`
          ).join("\n");
          const date = new Date(sale.createdOn);
          sale.saleDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          });
        })

        data.recentlyCreatedProducts.forEach(el=>{
          el.createdDate = new Date(el.createdOn).toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          });
        })
        return DashboardActions.loadDashboardDataSuccess({ data })}),
      catchError(error => {
        this._notificationsService.showErrorSnackBar(error.error);
        return of(DashboardActions.loadDashboardDataFailure({ error: error.error.message }));
      }),
    )),
  ));

  constructor(
    private _actions$: Actions,
    private _dashboardService: DashboardService,
    private _notificationsService: NotificationsService,
  ) {
  }
}
