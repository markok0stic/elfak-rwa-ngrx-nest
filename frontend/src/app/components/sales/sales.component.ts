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
import { TableAdditionalActions } from '../_table/table.component';
import { ReportsService } from '../../services/sales/reports.service';

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
  generateSaleReportAction: TableAdditionalActions;

  constructor(private _store: Store<AppState>,
              private _dialog: MatDialog) {
    this._store.dispatch(ProductActions.loadProducts())
    this.sales$ = this._store.select(selectAllSales);
    this.saleToEdit = null;
    this.columnsToDisplay = ['id', 'products', 'saleDate', 'total'];
    this.loading = false;
    this.generateSaleReportAction = {
      icon: "print",
      matToolTip: "Generate Sale Report"
    }
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

  handleGenerateSaleReport(sale: SaleModel) {
    this._store.dispatch(SalesActions.generateSaleReportById({id: sale.id}))
  }
}
