import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Category } from '../../models/category/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private baseUrl = `${environment.api}/categories`;

  constructor(private http: HttpClient) {
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}`);
  }

  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.baseUrl, category);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.baseUrl}/${category.id}`, category);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
