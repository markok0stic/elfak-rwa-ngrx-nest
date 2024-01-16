import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../../environments/environment";
import {CustomerModel} from "../../models/customer/customer.model";

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  private apiUrl = `${environment.api}/customers`;

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<CustomerModel[]> {
    return this.http.get<CustomerModel[]>(this.apiUrl);
  }

  // Metode za dodavanje, ažuriranje i brisanje kupaca...
}
