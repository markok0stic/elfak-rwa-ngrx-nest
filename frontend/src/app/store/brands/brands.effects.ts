import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as BrandsActions from './brands.actions';
import { NotificationsService } from '../../services/notifications/notifications.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { BrandsService } from '../../services/brands/brands.service';
import { BrandModel } from '../../models/brand/brand.model';

@Injectable()
export class BrandsEffects {
  loadBrands$ = createEffect(() => this.actions$.pipe(
    ofType(BrandsActions.loadBrands),
    mergeMap(() => this.brandsService.getAllBrands().pipe(
      map(brands => BrandsActions.loadBrandsSuccess({ brands })),
      catchError(error => {
        this.notificationsService.showErrorSnackBar(error.error);
        return of(BrandsActions.loadBrandsFailure({ error: error.error.message }));
      }),
    )),
  ));

  createBrands$ = createEffect(() => this.actions$.pipe(
    ofType(BrandsActions.createBrands),
    mergeMap(({ brand }) =>
      this.brandsService.addBrand(brand).pipe(
        map(() => {
          this.notificationsService.showSuccessSnackBar('Brand successfully created');
          return BrandsActions.createBrandsSuccess({ success: true });
        }),
        tap(() => {
          this.store.dispatch(BrandsActions.loadBrands());
        }),
        catchError((error: HttpErrorResponse) => {
          this.notificationsService.showErrorSnackBar(error.error);
          return of(BrandsActions.createBrandsFailure({ error: error.error.message }));
        }),
      ),
    ),
  ));

  editBrands$ = createEffect(() => this.actions$.pipe(
    ofType(BrandsActions.editBrands),
    mergeMap(({ brand }) =>
      this.brandsService.updateBrand(brand).pipe(
        map((updatedBrand: BrandModel) => {
          this.notificationsService.showSuccessSnackBar('Brand updated successfully');
          return BrandsActions.editBrandsSuccess({ brand: updatedBrand });
        }),
        tap(() => {
          this.store.dispatch(BrandsActions.loadBrands());
        }),
        catchError(error => {
          this.notificationsService.showErrorSnackBar(error.error);
          return of(BrandsActions.editBrandsFailure({ error }));
        }),
      ),
    ),
  ));

  deleteBrands$ = createEffect(() => this.actions$.pipe(
    ofType(BrandsActions.deleteBrands),
    mergeMap(({ brandId }) =>
      this.brandsService.deleteBrand(brandId).pipe(
        map(() => {
          this.notificationsService.showSuccessSnackBar(`Brand with id: ${brandId} deleted successfully`);
          return BrandsActions.deleteBrandsSuccess({ brandId });
        }),
        tap(() => {
          this.store.dispatch(BrandsActions.loadBrands());
        }),
        catchError(error => {
          this.notificationsService.showErrorSnackBar(error.error);
          return of(BrandsActions.deleteBrandsFailure({ error }));
        }),
      ),
    ),
  ));

  constructor(
    private actions$: Actions,
    private brandsService: BrandsService,
    private notificationsService: NotificationsService,
    private store: Store<AppState>
  ) {}
}
