import { createAction, props } from '@ngrx/store';
import { SupplierModel } from '../../models/supplier/supplier.model';

export const loadSuppliers = createAction('[Suppliers] Load Suppliers');
export const loadSuppliersSuccess = createAction('[Suppliers] Load Suppliers Success', props<{ suppliers: SupplierModel[] }>());
export const loadSuppliersFailure = createAction('[Suppliers] Load Suppliers Failure', props<{ error: any }>());

export const createSupplier = createAction('[Supplier] Create Supplier', props<{ supplier: SupplierModel }>());
export const createSupplierSuccess = createAction('[Supplier] Create Supplier Success', props<{ success: boolean }>());
export const createSupplierFailure = createAction('[Supplier] Create Supplier Failure', props<{ error: any }>());

export const editSupplier = createAction('[Supplier] Edit Supplier', props<{ supplier: SupplierModel }>());
export const editSupplierSuccess = createAction('[Supplier] Edit Supplier Success', props<{ supplier: SupplierModel }>());
export const editSupplierFailure = createAction('[Supplier] Edit Supplier Failure', props<{ error: any }>());

export const deleteSupplier = createAction('[Supplier] Delete Supplier', props<{ supplierId: number }>());
export const deleteSupplierSuccess = createAction('[Supplier] Delete Supplier Success', props<{ supplierId: number }>());
export const deleteSupplierFailure = createAction('[Supplier] Delete Supplier Failure', props<{ error: any }>());
