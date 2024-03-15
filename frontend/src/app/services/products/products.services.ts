import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ProductModel } from '../../models/product/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private baseUrl = `${environment.api}/products`;

  constructor(private httpClient: HttpClient) {}

  getAllProducts(): Observable<ProductModel[]> {
    return this.httpClient.get<ProductModel[]>(`${this.baseUrl}`);
  }

  addProduct(product: ProductModel): Observable<ProductModel> {
    return this.httpClient.post<ProductModel>(`${this.baseUrl}`, product);
  }

  updateProduct(product: ProductModel): Observable<ProductModel> {
    return this.httpClient.put<ProductModel>(`${this.baseUrl}/${product.id}`, product);
  }

  getProductById(id: number): Observable<ProductModel> {
    return this.httpClient.get<ProductModel>(`${this.baseUrl}/${id}`);
  }

  deleteProduct(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }
}
