import { createAction, props } from '@ngrx/store';
import { CreateSaleModel, SaleModel } from '../../models/sale/sale.model';

export const loadSales = createAction('[Sales] Load Sales');
export const loadSalesSuccess = createAction('[Sales] Load Sales Success', props<{ data: SaleModel[] }>());
export const loadSalesFailure = createAction('[Sales] Load Sales Failure', props<{ error: any }>());

export const createSales = createAction('[Sales] Create Sales', props<{ sale: CreateSaleModel }>());
export const createSalesSuccess = createAction('[Sales] Create Sales Success', props<{ success: boolean }>());
export const createSalesFailure = createAction('[Sales] Create Sales Failure', props<{ error: any }>());

export const deleteSales = createAction('[Sales] Delete Sales', props<{ saleId: number }>());
export const deleteSalesSuccess = createAction('[Sales] Delete Sales Success', props<{ saleId: number }>());
export const deleteSalesFailure = createAction('[Sales] Delete Sales Failure', props<{ error: any }>());
