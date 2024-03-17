import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductActions from './product.actions';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProductsService } from '../../services/products/products.service';
import * as ProductsActions from './product.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationsService } from '../../services/notifications/notifications.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { ProductModel } from '../../models/product/product.model';

@Injectable()
export class ProductEffects {

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      mergeMap(() =>
        this.productService.getAllProducts().pipe(
          map(products => {
            products.forEach(el=>{
              el.categoryName = el.category.name
            })
            return ProductActions.loadProductsSuccess({ data:products })
          }),
          catchError(error => {
            return of(ProductActions.loadProductsFailure({ error }))
          }),
        ),
      ),
    ),
  );

  createProducts$ = createEffect(() => this.actions$.pipe(
    ofType(ProductsActions.createProducts),
    mergeMap(({ product }) =>
      this.productService.addProduct(product).pipe(
        map(() => {
          this.notificationsService.showSuccessSnackBar('Product successfully created');
          return ProductsActions.createProductsSuccess({ success: true });
        }),
        tap(() => {
          this.store.dispatch(ProductsActions.loadProducts());
        }),
        catchError((error: HttpErrorResponse) => {
          this.notificationsService.showErrorSnackBar(error.error);
          return of(ProductsActions.createProductsFailure({ error: error.error.message }));
        }),
      ),
    ),
  ));

  editProducts$ = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.editProducts),
    mergeMap(({ product }) =>
      this.productService.updateProduct(product).pipe(
        map((updatedProduct: ProductModel) => {
          this.notificationsService.showSuccessSnackBar('Product updated successfully');
          return ProductActions.editProductsSuccess({ product: updatedProduct });
        }),
        tap(() => {
          this.store.dispatch(ProductsActions.loadProducts());
        }),
        catchError(error => {
          this.notificationsService.showErrorSnackBar(error.error);
          return of(ProductsActions.editProductsFailure({ error }));
        }),
      ),
    ),
  ));

  deleteProducts$ = createEffect(() => this.actions$.pipe(
    ofType(ProductsActions.deleteProducts),
    mergeMap(({ productId }) =>
      this.productService.deleteProduct(productId).pipe(
        map(() => {
          this.notificationsService.showSuccessSnackBar(`Product with id: ${productId} deleted successfully`);
          return ProductsActions.deleteProductsSuccess({ productId });
        }),
        tap(() => {
          this.store.dispatch(ProductsActions.loadProducts());
        }),
        catchError(error => {
          this.notificationsService.showErrorSnackBar(error.error);
          return of(ProductsActions.deleteProductsFailure({ error }));
        }),
      ),
    ),
  ));

  constructor(
    private actions$: Actions,
    private productService: ProductsService,
    private notificationsService: NotificationsService,
    private store: Store<AppState>
  ) {
  }
}
