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
import { UserModel } from '../../models/user/user.model';
import { setUser } from '../../services/auth/user.context';

@Injectable()
export class UsersEffects {
  loadUsers$ = createEffect(() => this._actions$.pipe(
    ofType(UserActions.loadUsers),
    mergeMap(() => this._usersService.getAll().pipe(
      map((users) => {
        return UserActions.loadUsersSuccess({ users })}),
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
          tap(() => {
            this._store.dispatch(UserActions.loadUsers());
          }),
          catchError((error: HttpErrorResponse) => {
            this._notificationsService.showErrorSnackBar(error.error);
            return of(UserActions.registerFailure({ error: error.error.message }));
          }),
        ),
      ),
    ),
  );

  editProfile$ = createEffect(() =>
    this._actions$.pipe(
      ofType(UserActions.editUserProfile),
      mergeMap(({ userData }) =>
        this._usersService.editUser(userData).pipe(
          map((user: UserModel) => {
            this._notificationsService.showSuccessSnackBar('Profile Updated');
            return UserActions.editUserProfileSuccess({ user });
          }),
          tap(() => {
            this._store.dispatch(UserActions.loadUsers());
          }),
          catchError(error => {
            this._notificationsService.showErrorSnackBar(error.error);
            return of({ type: error });
          }),
        ),
      ),
    ),
  );

  deleteUser$ = createEffect(() =>
    this._actions$.pipe(
      ofType(UserActions.deleteUser),
      mergeMap(({ userId }) =>
        this._usersService.deleteUser(userId).pipe(
          map((_) => {
            this._notificationsService.showSuccessSnackBar(`Profile with ID: ${userId} deleted`);
            return UserActions.deleteUserSuccess({userId});
          }),
          tap(() => {
            this._store.dispatch(UserActions.loadUsers());
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
    private _actions$: Actions,
    private _usersService: UsersService,
    private _store: Store<AppState>,
    private _notificationsService: NotificationsService
  ) {}
}
