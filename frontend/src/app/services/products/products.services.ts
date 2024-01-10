import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Product} from "../../models/product/product";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private baseUrl = `${environment.api}/products`;

  constructor(private httpClient: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.baseUrl);
  }
}
