import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ProductModel} from "../../models/product/product.model";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private baseUrl = `${environment.api}/products`;

  constructor(private httpClient: HttpClient) {}

  getAllProducts(): Observable<ProductModel[]> {
    return this.httpClient.get<ProductModel[]>(this.baseUrl);
  }
}
