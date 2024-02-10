import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as CategoryActions from './categories.actions';
import { CategoriesService } from '../../services/categories/categories.service';
import * as UserActions from '../users/users.actions';
import { NotificationsService } from '../../services/notifications/notifications.service';

@Injectable()
export class CategoriesEffects {
  loadCategories$ = createEffect(() => this._actions$.pipe(
    ofType(CategoryActions.loadCategories),
    mergeMap(() => this._categoryService.getAllCategories().pipe(
      map(categories => CategoryActions.loadCategoriesSuccess({ categories })),
      catchError(error => {
        this._notificationsService.showErrorSnackBar(error.error);
        return of(UserActions.registerFailure({ error: error.error.message }));
      }),
    )),
  ));

  constructor(
    private _actions$: Actions,
    private _categoryService: CategoriesService,
    private _notificationsService: NotificationsService,
  ) {
  }
}
