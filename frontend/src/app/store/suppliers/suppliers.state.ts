import { State } from '../../models/state';
import { SupplierModel } from '../../models/supplier/supplier.model';

export type SuppliersState = State<SupplierModel> & {
  successfulCreation: boolean | null;
}
