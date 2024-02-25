import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ModelModel } from '../../models/model/model.model';

@Injectable({
  providedIn: 'root',
})
export class ModelsService {
  private baseUrl = `${environment.api}/models`;

  constructor(private http: HttpClient) {}

  getAllModels(): Observable<ModelModel[]> {
    return this.http.get<ModelModel[]>(`${this.baseUrl}`);
  }

  addModel(model: ModelModel): Observable<ModelModel> {
    return this.http.post<ModelModel>(this.baseUrl, model);
  }

  updateModel(model: ModelModel): Observable<ModelModel> {
    return this.http.put<ModelModel>(`${this.baseUrl}/${model.id}`, model);
  }

  deleteModel(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
