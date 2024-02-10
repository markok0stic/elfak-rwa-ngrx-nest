import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriesState } from '../../store/categories/categories.state';
import { CategoryModel } from '../../models/category/category.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { MatDialog } from '@angular/material/dialog';
import { selectAllCategories } from '../../store/categories/categories.selectors';
import * as CategoryActions from '../../store/categories/categories.actions';
import { UserModel } from '../../models/user/user.model';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import * as UsersActions from '../../store/users/users.actions';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories$: Observable<CategoriesState>;
  columnsToDisplay: string[];
  data: CategoryModel[] = [];
  loading: boolean;
  categoryToEdit: CategoryModel | null;

  constructor(private _store: Store<AppState>, private _dialog: MatDialog) {
    this.categoryToEdit = null;
    this.categories$ = this._store.select(selectAllCategories);
    this.columnsToDisplay = ['id', 'name', 'description'];
    this.loading = false;
  }

  ngOnInit(): void {
    this._store.dispatch(CategoryActions.loadCategories());
  }

  handleEdit(category: CategoryModel) {
    this.categoryToEdit = category;
  }

  handleDelete(category: CategoryModel) {
    const dialogRef = this._dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._store.dispatch(CategoryActions.loadCategories());
      }
    });
  }
}
