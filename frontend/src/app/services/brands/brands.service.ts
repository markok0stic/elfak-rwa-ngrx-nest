import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BrandModel } from '../../models/brand/brand.model';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  private baseUrl = `${environment.api}/brands`;

  constructor(private http: HttpClient) {}

  getAllBrands(): Observable<BrandModel[]> {
    return this.http.get<BrandModel[]>(`${this.baseUrl}`);
  }

  addBrand(brand: BrandModel): Observable<BrandModel> {
    return this.http.post<BrandModel>(this.baseUrl, brand);
  }

  updateBrand(brand: BrandModel): Observable<BrandModel> {
    return this.http.put<BrandModel>(`${this.baseUrl}/${brand.id}`, brand);
  }

  deleteBrand(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
