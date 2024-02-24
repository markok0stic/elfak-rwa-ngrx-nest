import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BrandsState } from '../../store/brands/brands.state';
import { BrandModel } from '../../models/brand/brand.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { MatDialog } from '@angular/material/dialog';
import { selectAllBrands } from '../../store/brands/brands.selectors';
import * as BrandsActions from '../../store/brands/brands.actions';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  brands$: Observable<BrandsState>;
  columnsToDisplay: string[];
  data: BrandModel[] = [];
  brandToEdit: BrandModel | null;
  loading: boolean;

  constructor(private _store: Store<AppState>, private _dialog: MatDialog) {
    this.brandToEdit = null;
    this.brands$ = this._store.select(selectAllBrands);
    this.columnsToDisplay = ['id', 'name', 'status'];
    this.loading = false;
  }

  ngOnInit(): void {
    this._store.dispatch(BrandsActions.loadBrands());
  }

  handleEdit(brand: BrandModel) {
    this.brandToEdit = brand;
  }

  handleDelete(brand: BrandModel) {
    const dialogRef = this._dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._store.dispatch(BrandsActions.deleteBrands({brandId: brand.id}));
      }
    });
  }
}
