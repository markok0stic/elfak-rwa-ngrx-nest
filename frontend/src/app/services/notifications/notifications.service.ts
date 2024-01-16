import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarActions, SnackBarType } from '../../enums/snackbar.enum';
import { BackendResponseErrorModel } from '@shared/models/backend.response.error.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  showErrorSnackBar(
    snackBar: MatSnackBar,
    error: BackendResponseErrorModel | Error,
    duration: number = 7000,
  ) {
    snackBar.open(error.message,SnackbarActions.Ok,{duration, panelClass: SnackBarType.Error});
  }

  showSuccessSnackBar(
    snackBar: MatSnackBar,
    snackBarMessage: string,
    duration: number = 3000,
  ) {
    snackBar.open(snackBarMessage,SnackbarActions.Close,{duration, panelClass: SnackBarType.Default});
  }
}
