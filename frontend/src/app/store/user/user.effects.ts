import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as UserActions from './user.actions';
import { LoginUser, UserModel } from '../../models/user/user.model';
import { UsersService } from '../../services/users/users.service';
import { setToken, setUser } from '../../services/auth/user.context';
import { NotificationsService } from '../../services/notifications/notifications.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class UserEffects {
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
  editProfile$ = createEffect(() =>
    this._action$.pipe(
      ofType(UserActions.editProfile),
      mergeMap(({ userData }) =>
        this._usersService.editProfile(userData).pipe(
          map((user: UserModel) => {
            setUser(user);
            this._notificationsService.showSuccessSnackBar('Profile Updated');
            return UserActions.editProfileSuccess({ user });
          }),
          catchError(error => {
            this._notificationsService.showErrorSnackBar(error.error);
            return of({ type: error });
          }),
        ),
      ),
    ),
  );
  registerUser$ = createEffect(() =>
    this._action$.pipe(
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
    private _action$: Actions,
    private _router: Router,
    private _usersService: UsersService,
    private _notificationsService: NotificationsService,
  ) {
  }
}
