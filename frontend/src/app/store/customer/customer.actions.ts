import { createAction, props } from '@ngrx/store';
import { CustomerModel } from '../../models/customer/customer.model';

export const requestLoadCustomers = createAction('[CustomerModel] Request Load Customers');

export const loadCustomersSuccess = createAction('[CustomerModel] Load Customers Success',
  props<{ customers: CustomerModel[] }>(),
);

export const loadCustomersFailure = createAction('[CustomerModel] Load Customers Failure',
  props<{ error: any }>(),
);

export const requestAddCustomer = createAction('[CustomerModel] Request Add CustomerModel',
  props<{ customer: CustomerModel }>(),
);

export const addCustomerSuccess = createAction('[CustomerModel] Add CustomerModel Success',
  props<{ customer: CustomerModel }>(),
);

export const addCustomerFailure = createAction('[CustomerModel] Add CustomerModel Failure',
  props<{ error: any }>(),
);


// Dodajte akcije za ažuriranje i brisanje kupaca...
