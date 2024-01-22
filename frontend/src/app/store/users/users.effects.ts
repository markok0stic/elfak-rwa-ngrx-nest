import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as UserActions from './users.actions';
import { UsersService } from '../../services/users/users.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationsService } from '../../services/notifications/notifications.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';

@Injectable()
export class UsersEffects {
  loadUsers$ = createEffect(() => this._actions$.pipe(
    ofType(UserActions.loadUsers),
    mergeMap(() => this._usersService.getAll().pipe(
      map(users => UserActions.loadUsersSuccess({ users })),
      catchError(error => of(UserActions.loadUsersFailure({ error })))
    ))
  ));

  registerUser$ = createEffect(() =>
    this._actions$.pipe(
      ofType(UserActions.registerUser),
      mergeMap(({ registerData }) =>
        this._usersService.register(registerData).pipe(
          map(() => {
            this._notificationsService.showSuccessSnackBar('Registration successful');
            return UserActions.registerSuccess({
              successfulRegistrationData: {
                successfulRegistration: true,
                password: registerData.password,
                email: registerData.email,
              },
            });
          }),
          catchError((error: HttpErrorResponse) => {
            this._notificationsService.showErrorSnackBar(error.error);
            return of(UserActions.registerFailure({ error: error.error.message }));
          }),
        ),
      ),
    ),
  );

  constructor(
    private _actions$: Actions,
    private _usersService: UsersService,
    private _notificationsService: NotificationsService
  ) {}
}
