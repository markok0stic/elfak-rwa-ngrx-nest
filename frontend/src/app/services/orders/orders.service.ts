import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../../environments/environment";
import {Order} from "../../models/order/order";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private apiUrl = `${environment.api}/orders`;

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  // Metode za kreiranje, ažuriranje i brisanje narudžbina...
}
