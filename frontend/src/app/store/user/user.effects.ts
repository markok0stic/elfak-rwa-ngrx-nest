import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';

import * as UserActions from './user.actions';
import { LoginUser, User } from '../../models/user/user';
import { UsersService } from '../../services/users/users.service';
import { setToken, setUser } from '../../services/auth/user.context';
import { NotificationsService } from '../../services/notifications/notifications.service';

@Injectable()
export class UserEffects {
  constructor(
    private action$: Actions,
    private router: Router,
    private snackBar: MatSnackBar,
    private usersService: UsersService,
    private notificationsService: NotificationsService
  ) {}

  loginUser$ = createEffect(() =>
    this.action$.pipe(
      ofType(UserActions.loginUser),
      mergeMap(({ email, password }) =>
        this.usersService.login(email, password).pipe(
          map((data: LoginUser) => {
            setToken(data.accessToken);
            setUser(data.user);
            this.router.navigate(['layout'], { replaceUrl: true });
            return UserActions.loginSuccess({ data });
          }),
          catchError(error => {
            this.snackBar.open(
              this.notificationsService.getMessage('unauthorized'),
              this.notificationsService.getMessage('close'),
              { duration: 5000 }
            );
            setToken(null);
            setUser(null);
            return of(UserActions.loginFailure({ error: 'BadCredentials' }));
          })
        )
      )
    )
  );

  logoutUser$ = createEffect(() =>
      this.action$.pipe(
        ofType(UserActions.logoutUser),
        tap(() => {
          setToken(null);
          setUser(null);
          this.router.navigate(['login'], { replaceUrl: true });
        })
      ),
    { dispatch: false }
  );

  registerUser$ = createEffect(() =>
    this.action$.pipe(
      ofType(UserActions.registerUser),
      mergeMap(({ registerData }) =>
        this.usersService.register(registerData).pipe(
          map(() => {
            this.snackBar.open(
              this.notificationsService.getMessage('registrationSuccess'),
              this.notificationsService.getMessage('ok'),
              { duration: 5000 }
            );
            this.router.navigate(['register'], { replaceUrl: true });
            return UserActions.registerSuccess();
          }),
          catchError(error => {
            this.snackBar.open(
              this.notificationsService.getMessage('serverError'),
              this.notificationsService.getMessage('close'),
              { duration: 5000 }
            );
            return of(UserActions.registerFailure());
          })
        )
      )
    )
  );

  editProfile$ = createEffect(() =>
    this.action$.pipe(
      ofType(UserActions.editProfile),
      mergeMap(({ userData }) =>
        this.usersService.editProfile(userData).pipe(
          map((user: User) => {
            setUser(user);
            this.snackBar.open(
              this.notificationsService.getMessage('profileUpdated'),
              this.notificationsService.getMessage('ok'),
              { duration: 3000 }
            );
            return UserActions.editProfileSuccess({ user });
          }),
          catchError(error => {
            this.snackBar.open(
              this.notificationsService.getMessage('serverError'),
              this.notificationsService.getMessage('close'),
              { duration: 3000 }
            );
            return of({ type: error });
          })
        )
      )
    )
  );
}
