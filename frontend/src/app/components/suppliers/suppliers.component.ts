import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SuppliersState } from '../../store/suppliers/suppliers.state';
import { SupplierModel } from '../../models/supplier/supplier.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { MatDialog } from '@angular/material/dialog';
import { selectAllSuppliers } from '../../store/suppliers/suppliers.selectors';
import * as SupplierActions from '../../store/suppliers/suppliers.actions';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { CategoryModel } from '../../models/category/category.model';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit {
  suppliers$: Observable<SuppliersState>;
  columnsToDisplay: string[];
  data: SupplierModel[] = [];
  supplierToEdit: SupplierModel | null;
  loading: boolean;

  constructor(private _store: Store<AppState>, private _dialog: MatDialog) {
    this.supplierToEdit = null;
    this.suppliers$ = this._store.select(selectAllSuppliers);
    this.columnsToDisplay = ['id', 'name', 'mobile', 'address', 'status'];
    this.loading = false;
  }

  ngOnInit(): void {
    this._store.dispatch(SupplierActions.loadSuppliers());
  }

  handleEdit(supplier: SupplierModel) {
    this.supplierToEdit = supplier;
  }

  handleDelete(supplier: SupplierModel) {
    const dialogRef = this._dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._store.dispatch(SupplierActions.deleteSupplier({supplierId: supplier.id}));
      }
    });
  }
}
