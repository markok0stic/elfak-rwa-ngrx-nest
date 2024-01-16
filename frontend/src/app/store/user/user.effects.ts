import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
            this.notificationsService.showErrorSnackBar(this.snackBar,error.error)
            setToken(null);
            setUser(null);
            return of(UserActions.loginFailure({ error: error.error.message }));
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

  editProfile$ = createEffect(() =>
    this.action$.pipe(
      ofType(UserActions.editProfile),
      mergeMap(({ userData }) =>
        this.usersService.editProfile(userData).pipe(
          map((user: UserModel) => {
            setUser(user);
            this.notificationsService.showSuccessSnackBar(this.snackBar,"Profile Updated")
            return UserActions.editProfileSuccess({ user });
          }),
          catchError(error => {
            this.notificationsService.showErrorSnackBar(this.snackBar,error.error)
            return of({ type: error });
          })
        )
      )
    )
  );

  registerUser$ = createEffect(() =>
    this.action$.pipe(
      ofType(UserActions.registerUser),
      mergeMap(({ registerData }) =>
        this.usersService.register(registerData).pipe(
          map(() => {
            this.notificationsService.showSuccessSnackBar(this.snackBar,"Registration successful")
            return UserActions.registerSuccess();
          }),
          catchError((error: HttpErrorResponse) => {
            this.notificationsService.showErrorSnackBar(this.snackBar,error.error)
            return of(UserActions.registerFailure({error: error.error.message}));
          })
        )
      )
    )
  );
}
