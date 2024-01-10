import {Customer} from "../../models/customer/customer";

export interface CustomerState {
  customers: Customer[];
  loading: boolean;
  error: any;
}
