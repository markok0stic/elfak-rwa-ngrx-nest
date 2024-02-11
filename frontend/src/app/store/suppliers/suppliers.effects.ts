import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as SuppliersActions from './suppliers.actions';
import { SuppliersService } from '../../services/suppliers/suppliers.service';
import { NotificationsService } from '../../services/notifications/notifications.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { SupplierModel } from '../../models/supplier/supplier.model';

@Injectable()
export class SuppliersEffects {
  loadSuppliers$ = createEffect(() => this.actions$.pipe(
    ofType(SuppliersActions.loadSuppliers),
    mergeMap(() => this.suppliersService.getAllSuppliers().pipe(
      map(suppliers => SuppliersActions.loadSuppliersSuccess({ suppliers })),
      catchError(error => {
        this.notificationsService.showErrorSnackBar(error.error);
        return of(SuppliersActions.loadSuppliersFailure({ error: error.error.message }));
      }),
    )),
  ));

  createSupplier$ = createEffect(() => this.actions$.pipe(
    ofType(SuppliersActions.createSupplier),
    mergeMap(({ supplier }) =>
      this.suppliersService.addSupplier(supplier).pipe(
        map(() => {
          this.notificationsService.showSuccessSnackBar('Supplier successfully created');
          return SuppliersActions.createSupplierSuccess({ success: true });
        }),
        tap(() => {
          this.store.dispatch(SuppliersActions.loadSuppliers());
        }),
        catchError((error: HttpErrorResponse) => {
          this.notificationsService.showErrorSnackBar(error.error);
          return of(SuppliersActions.createSupplierFailure({ error: error.error.message }));
        }),
      ),
    ),
  ));

  editSupplier$ = createEffect(() => this.actions$.pipe(
    ofType(SuppliersActions.editSupplier),
    mergeMap(({ supplier }) =>
      this.suppliersService.updateSupplier(supplier).pipe(
        map((updatedSupplier: SupplierModel) => {
          this.notificationsService.showSuccessSnackBar('Supplier updated successfully');
          return SuppliersActions.editSupplierSuccess({ supplier: updatedSupplier });
        }),
        tap(() => {
          this.store.dispatch(SuppliersActions.loadSuppliers());
        }),
        catchError(error => {
          this.notificationsService.showErrorSnackBar(error.error);
          return of(SuppliersActions.editSupplierFailure({ error }));
        }),
      ),
    ),
  ));

  deleteSupplier$ = createEffect(() => this.actions$.pipe(
    ofType(SuppliersActions.deleteSupplier),
    mergeMap(({ supplierId }) =>
      this.suppliersService.deleteSupplier(supplierId).pipe(
        map(() => {
          this.notificationsService.showSuccessSnackBar(`Supplier with id: ${supplierId} deleted successfully`);
          return SuppliersActions.deleteSupplierSuccess({ supplierId });
        }),
        tap(() => {
          this.store.dispatch(SuppliersActions.loadSuppliers());
        }),
        catchError(error => {
          this.notificationsService.showErrorSnackBar(error.error);
          return of(SuppliersActions.deleteSupplierFailure({ error }));
        }),
      ),
    ),
  ));

  constructor(
    private actions$: Actions,
    private suppliersService: SuppliersService,
    private notificationsService: NotificationsService,
    private store: Store<AppState>
  ) {}
}
