import { CustomerModel } from '../../models/customer/customer.model';

export interface CustomerState {
  customers: CustomerModel[];
  loading: boolean;
  error: any;
}
