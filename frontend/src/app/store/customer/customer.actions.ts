import { createAction, props } from '@ngrx/store';
import {Customer} from "../../models/customer/customer";

export const requestLoadCustomers = createAction('[Customer] Request Load Customers');

export const loadCustomersSuccess = createAction('[Customer] Load Customers Success',
  props<{ customers: Customer[] }>()
);

export const loadCustomersFailure = createAction('[Customer] Load Customers Failure',
  props<{ error: any }>()
);

export const requestAddCustomer = createAction('[Customer] Request Add Customer',
  props<{ customer: Customer }>()
);

export const addCustomerSuccess = createAction('[Customer] Add Customer Success',
  props<{ customer: Customer }>()
);

export const addCustomerFailure = createAction('[Customer] Add Customer Failure',
  props<{ error: any }>()
);


// Dodajte akcije za ažuriranje i brisanje kupaca...
