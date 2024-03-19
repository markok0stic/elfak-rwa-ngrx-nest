import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CustomerModel } from '../../models/customer/customer.model';
import { DashboardModel } from '../../models/dashboard/dashboard.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiUrl = `${environment.api}/dashboard`;

  constructor(private http: HttpClient) {
  }

  getDashboardData(): Observable<DashboardModel> {
    return this.http.get<DashboardModel>(this.apiUrl);
  }
}
