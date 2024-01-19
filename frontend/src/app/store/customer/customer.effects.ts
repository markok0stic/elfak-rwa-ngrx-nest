import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CustomerActions from './customer.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CustomersService } from '../../services/customers/customers.service';

@Injectable()
export class CustomerEffects {

  loadCustomers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.requestLoadCustomers),
      mergeMap(() =>
        this.customerService.getCustomers().pipe(
          map(customers => CustomerActions.loadCustomersSuccess({ customers })),
          catchError(error => of(CustomerActions.loadCustomersFailure({ error }))),
        ),
      ),
    ),
  );

  // Efekti za dodavanje, ažuriranje i brisanje kupaca...

  constructor(
    private actions$: Actions,
    private customerService: CustomersService,
  ) {
  }
}
