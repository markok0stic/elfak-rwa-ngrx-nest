import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ProductSalesModel } from '../../models/dashboard/product.sales.model';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  private baseUrl = `${environment.api}/report`;

  constructor(private httpClient: HttpClient) {}

  getSaleReportById(id: number): Observable<Blob> {
    return this.httpClient.get<Blob>(`${this.baseUrl}/${id}`, {
      responseType: 'blob' as 'json',
      headers: new HttpHeaders({
        'Accept': 'application/pdf'
      })
    });
  }

  getSalesReportByDate(dateFrom: Date, dateTo?: Date): Observable<Blob> {
    return this.httpClient.post(`${this.baseUrl}/`, { dateFrom, dateTo }, {
      responseType: 'blob',
      headers: new HttpHeaders({
        'Accept': 'application/pdf',
        'Content-Type': 'application/json'
      })
    });
  }

  getMonthlySalesByProduct(month: string): Observable<ProductSalesModel[]> {
    return this.httpClient.get<ProductSalesModel[]>(`${this.baseUrl}/products-monthly`, { params: { month } });
  }
}
