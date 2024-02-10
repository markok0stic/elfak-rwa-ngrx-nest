import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as CategoryActions from './categories.actions';
import { CategoriesService } from '../../services/categories/categories.service';
import { NotificationsService } from '../../services/notifications/notifications.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AppState } from '../../app.state';
import { Store } from '@ngrx/store';

@Injectable()
export class CategoriesEffects {
  loadCategories$ = createEffect(() => this._actions$.pipe(
    ofType(CategoryActions.loadCategories),
    mergeMap(() => this._categoryService.getAllCategories().pipe(
      map(categories => CategoryActions.loadCategoriesSuccess({ categories })),
      catchError(error => {
        this._notificationsService.showErrorSnackBar(error.error);
        return of(CategoryActions.loadCategoriesFailure({ error: error.error.message }));
      }),
    )),
  ));

  createCategory$ = createEffect(() =>
    this._actions$.pipe(
      ofType(CategoryActions.createCategory),
      mergeMap(({ category }) =>
        this._categoryService.addCategory(category).pipe(
          map(() => {
            this._notificationsService.showSuccessSnackBar('Successfully created');
            return CategoryActions.createCategorySuccess({
              success: true
            });
          }),
          tap(() => {
            this._store.dispatch(CategoryActions.loadCategories());
          }),
          catchError((error: HttpErrorResponse) => {
            this._notificationsService.showErrorSnackBar(error.error);
            return of(CategoryActions.createCategoryFailure({ error: error.error.message }));
          }),
        ),
      ),
    ),
  );

  constructor(
    private _actions$: Actions,
    private _store: Store<AppState>,
    private _categoryService: CategoriesService,
    private _notificationsService: NotificationsService,
  ) {
  }
}
