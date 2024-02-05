import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from '../../app.state';
import { Store } from '@ngrx/store';
import { UsersState } from '../../store/users/users.state';
import { selectAllUsers } from '../../store/users/users.selectors';
import * as UsersActions from '../../store/users/users.actions';
import { UserModel } from '../../models/user/user.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users$: Observable<UsersState>
  columnsToDisplay: string[];
  data: UserModel[] = [];
  loading: boolean;
  userToEdit: UserModel | null;

  constructor(private _store: Store<AppState>, private _dialog: MatDialog) {
    this.userToEdit = null;
    this.users$ = this._store.select(selectAllUsers);
    this.columnsToDisplay = ['id','firstName','lastName','email','phone','country','role'];
    this.loading = false;
  }

  ngOnInit(): void {
    this._store.dispatch(UsersActions.loadUsers());
  }

  handleEdit(user: UserModel) {
    this.userToEdit = user;
  }

  handleDelete(user: UserModel) {
    const dialogRef = this._dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._store.dispatch(UsersActions.deleteUser({ userId: Number(user.id) }));
      }
    });
  }
}
