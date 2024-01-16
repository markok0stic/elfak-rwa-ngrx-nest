import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../../environments/environment";
import {OrderModel} from "../../models/order/order.model";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private apiUrl = `${environment.api}/orders`;

  constructor(private http: HttpClient) {}

  getOrders(): Observable<OrderModel[]> {
    return this.http.get<OrderModel[]>(this.apiUrl);
  }

  // Metode za kreiranje, ažuriranje i brisanje narudžbina...
}
