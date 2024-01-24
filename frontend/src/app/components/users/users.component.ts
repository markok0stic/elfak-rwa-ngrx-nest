import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject, switchMap, takeUntil, timer } from 'rxjs';
import { AppState } from '../../app.state';
import { Store } from '@ngrx/store';
import { UsersState } from '../../store/users/users.state';
import { selectAllUsers } from '../../store/users/users.selectors';
import * as UsersActions from '../../store/users/users.actions';
import { UserModel } from '../../models/user/user.model';
import { UsersService } from '../../services/users/users.service';
import { RolesEnum } from '@shared/enums/roles.enum';
import { tap } from 'rxjs/operators';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
  users$: Observable<UsersState>
  columnsToDisplay: string[];
  data: UserModel[] = [];
  loading: boolean;

  constructor(private _store: Store<AppState>) {
    this.users$ = this._store.select(selectAllUsers);
    this.columnsToDisplay = ['id','firstName','lastName','email','phone','country','role'];
    this.loading = false;
  }

  ngOnInit(): void {
    this._store.dispatch(UsersActions.loadUsers());
  }
}
