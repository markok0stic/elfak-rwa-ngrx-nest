import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CategoryModel } from '../../models/category/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private baseUrl = `${environment.api}/categories`;

  constructor(private http: HttpClient) {
  }

  getAllCategories(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(`${this.baseUrl}`);
  }

  addCategory(category: CategoryModel): Observable<CategoryModel> {
    return this.http.post<CategoryModel>(this.baseUrl, category);
  }

  updateCategory(category: CategoryModel): Observable<CategoryModel> {
    return this.http.put<CategoryModel>(`${this.baseUrl}/${category.id}`, category);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
