import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductActions from './product.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProductsService } from '../../services/products/products.services';

@Injectable()
export class ProductEffects {

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.requestLoadProducts),
      mergeMap(() =>
        this.productService.getAllProducts().pipe(
          map(products => ProductActions.loadProductsSuccess({ products })),
          catchError(error => of(ProductActions.loadProductsFailure({ error }))),
        ),
      ),
    ),
  );

  // Define effects for addProduct...

  constructor(
    private actions$: Actions,
    private productService: ProductsService,
  ) {
  }
}
