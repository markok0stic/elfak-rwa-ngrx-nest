import { createSelector } from '@ngrx/store';
import { AppState } from '../../app.state';
import { ProductState } from './product.state';

export const selectProducts = (state: AppState) => state.product;

export const selectAllProducts = createSelector(
  selectProducts,
  (state: ProductState) => state.products,
);

// Dodajte selektore za učitavanje, greške, i druge aspekte state-a...
