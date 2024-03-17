import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { SaleState } from '../../store/sales/sale.state';
import { SaleModel } from '../../models/sale/sale.model';
import * as ProductActions from '../../store/product/product.actions';
import * as SalesActions from '../../store/sales/sale.actions';
import { selectAllSales } from '../../store/sales/sale.selectors';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
  sales$: Observable<SaleState>;
  columnsToDisplay: string[];
  data: SaleModel[] = [];
  saleToEdit: SaleModel | null;
  loading: boolean;

  constructor(private _store: Store<AppState>, private _dialog: MatDialog) {
    this._store.dispatch(ProductActions.loadProducts())
    this.sales$ = this._store.select(selectAllSales);
    this.saleToEdit = null;
    this.columnsToDisplay = ['id', 'products', 'total', 'createdOn'];
    this.loading = false;
  }

  ngOnInit(): void {
    this._store.dispatch(SalesActions.loadSales());
  }

  handleEdit(sale: SaleModel) {
    this.saleToEdit = sale;
  }

  handleDelete(sale: SaleModel) {
    const dialogRef = this._dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._store.dispatch(SalesActions.deleteSales({saleId: sale.id}));
      }
    });
  }

}
