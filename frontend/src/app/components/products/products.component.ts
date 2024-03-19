import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { MatDialog } from '@angular/material/dialog';
import * as ProductsActions from '../../store/product/product.actions';
import * as CategoryActions from '../../store/categories/categories.actions';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ProductState } from '../../store/product/product.state';
import { ProductModel, UpdateProductModel } from '../../models/product/product.model';
import { selectAllProducts } from '../../store/product/product.selectors';
import { editProducts } from '../../store/product/product.actions';
import { TableAdditionalActions } from '../_table/table.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$: Observable<ProductState>;
  columnsToDisplay: string[];
  data: ProductModel[] = [];
  productToEdit: ProductModel | null;
  loading: boolean;
  increaseQuantity: TableAdditionalActions;

  constructor(private _store: Store<AppState>, private _dialog: MatDialog) {
    this._store.dispatch(CategoryActions.loadCategories())
    this.products$ = this._store.select(selectAllProducts);
    this.productToEdit = null;
    this.columnsToDisplay = ['sku', 'name', 'quantity', 'categoryName', 'salesPrice', 'purchasePrice'];
    this.loading = false;
    this.increaseQuantity = {
      icon: "add",
      matToolTip: "Increase Quantity"
    }
  }

  ngOnInit(): void {
    this._store.dispatch(ProductsActions.loadProducts());
  }

  handleEdit(product: ProductModel) {
    this.productToEdit = product;
  }

  handleDelete(product: ProductModel) {
    const dialogRef = this._dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._store.dispatch(ProductsActions.deleteProducts({productId: product.id}));
      }
    });
  }

  handleIncreaseQuantity(product: ProductModel) {
    const updatedProduct: UpdateProductModel = {
      id: product.id,
      name: product.name,
      description: product.description,
      quantity: product.quantity + 1,
      purchasePrice: product.purchasePrice,
      salesPrice: product.salesPrice,
      categoryId: product.category.id,
    };

    this._store.dispatch(editProducts({product: updatedProduct}));
  }
}
