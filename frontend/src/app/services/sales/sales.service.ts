import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CreateSaleModel, SaleModel } from '../../models/sale/sale.model';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  private baseUrl = `${environment.api}/sales`;

  constructor(private httpClient: HttpClient) {}

  getAllSales(): Observable<SaleModel[]> {
    return this.httpClient.get<SaleModel[]>(`${this.baseUrl}`);
  }

  addSale(sale: CreateSaleModel): Observable<SaleModel> {
    return this.httpClient.post<SaleModel>(`${this.baseUrl}`, sale);
  }

  getSaleById(id: number): Observable<SaleModel> {
    return this.httpClient.get<SaleModel>(`${this.baseUrl}/${id}`);
  }

  deleteSale(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }
}
