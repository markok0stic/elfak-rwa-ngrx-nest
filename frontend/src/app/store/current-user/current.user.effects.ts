import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as UserActions from './current.user.actions';
import { LoginUser, UserModel } from '../../models/user/user.model';
import { UsersService } from '../../services/users/users.service';
import { setToken, setUser } from '../../services/auth/user.context';
import { NotificationsService } from '../../services/notifications/notifications.service';
import { HttpErrorResponse } from '@angular/common/http';
import { editSelfProfile } from './current.user.actions';

@Injectable()
export class CurrentUserEffects {
  loginUser$ = createEffect(() =>
    this._action$.pipe(
      ofType(UserActions.loginUser),
      mergeMap(({ email, password }) =>
        this._usersService.login(email, password).pipe(
          map((data: LoginUser) => {
            setToken(data.accessToken);
            setUser(data.user);
            this._router.navigate(['layout'], { replaceUrl: true });
            return UserActions.loginSuccess({ data });
          }),
          catchError(error => {
            this._notificationsService.showErrorSnackBar(error.error);
            setToken(null);
            setUser(null);
            return of(UserActions.loginFailure({ error: error.error.message }));
          }),
        ),
      ),
    ),
  );
  logoutUser$ = createEffect(() =>
      this._action$.pipe(
        ofType(UserActions.logoutUser),
        tap(() => {
          setToken(null);
          setUser(null);
          this._router.navigate(['login'], { replaceUrl: true });
        }),
      ),
    { dispatch: false },
  );
  editSelfProfile$ = createEffect(() =>
    this._action$.pipe(
      ofType(UserActions.editSelfProfile),
      mergeMap(({ userData }) =>
        this._usersService.editUser(userData).pipe(
          map((user: UserModel) => {
            setUser(user);
            this._notificationsService.showSuccessSnackBar('Profile Updated');
            return UserActions.editSelfProfileSuccess({ user });
          }),
          catchError(error => {
            this._notificationsService.showErrorSnackBar(error.error);
            return of({ type: error });
          }),
        ),
      ),
    ),
  );

  constructor(
    private _action$: Actions,
    private _router: Router,
    private _usersService: UsersService,
    private _notificationsService: NotificationsService,
  ) {
  }
}
