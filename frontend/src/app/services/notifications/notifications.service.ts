import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarActions, SnackBarType } from '../../enums/snackbar.enum';
import { BackendResponseErrorModel } from '@shared/models/backend.response.error.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {

  constructor(private _snackBar: MatSnackBar) {
  }

  showErrorSnackBar(
    error: BackendResponseErrorModel | Error,
    duration: number = 7000,
  ) {
    this._snackBar.open(error.message, SnackbarActions.Ok, { duration, panelClass: SnackBarType.Error });
  }

  showSuccessSnackBar(
    snackBarMessage: string,
    duration: number = 3000,
  ) {
    this._snackBar.open(snackBarMessage, SnackbarActions.Close, { duration, panelClass: SnackBarType.Default });
  }
}
