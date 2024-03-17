import { State } from '../../models/state';
import { SaleModel } from '../../models/sale/sale.model';

export type SaleState = State<SaleModel> & {
  successfulCreation: boolean | null;
}
