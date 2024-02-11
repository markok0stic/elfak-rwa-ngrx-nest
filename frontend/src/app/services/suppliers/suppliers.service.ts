import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SupplierModel } from '../../models/supplier/supplier.model';

@Injectable({
  providedIn: 'root',
})
export class SuppliersService {
  private baseUrl = `${environment.api}/suppliers`;

  constructor(private http: HttpClient) {}

  getAllSuppliers(): Observable<SupplierModel[]> {
    return this.http.get<SupplierModel[]>(`${this.baseUrl}`);
  }

  addSupplier(supplier: SupplierModel): Observable<SupplierModel> {
    return this.http.post<SupplierModel>(this.baseUrl, supplier);
  }

  updateSupplier(supplier: SupplierModel): Observable<SupplierModel> {
    return this.http.put<SupplierModel>(`${this.baseUrl}/${supplier.id}`, supplier);
  }

  deleteSupplier(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
