import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';

import * as RegistrationActions from './registration.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersService } from '../../services/users/users.service';
import { NotificationsService } from '../../services/notifications/notifications.service';

@Injectable()
export class RegistrationEffects {
  constructor(
    private action$: Actions,
    private router: Router,
    private snackBar: MatSnackBar,
    private usersService: UsersService,
    private notificationsService: NotificationsService
  ) {}

  registerUser$ = createEffect(() =>
    this.action$.pipe(
      ofType(RegistrationActions.registerUser),
      mergeMap(({ registerData }) =>
        this.usersService.register(registerData).pipe(
          map(() => {
            this.snackBar.open(
              this.notificationsService.getMessage('registrationSuccess'),
              this.notificationsService.getMessage('ok'),
              { duration: 5000 }
            );
            return RegistrationActions.registerSuccess();
          }),
          catchError(error => {
            this.snackBar.open(
              this.notificationsService.getMessage('serverError'),
              this.notificationsService.getMessage('close'),
              { duration: 5000 }
            );
            return of(RegistrationActions.registerFailure());
          })
        )
      )
    )
  );
}
