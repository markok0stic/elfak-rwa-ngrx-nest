import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../../environments/environment";
import {Customer} from "../../models/customer/customer";

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  private apiUrl = `${environment.api}/customers`;

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl);
  }

  // Metode za dodavanje, ažuriranje i brisanje kupaca...
}
