import { Component, OnInit } from '@angular/core';
import { DashboardModel } from '../../models/dashboard/dashboard.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { loadDashboardData } from '../../store/dashboard/dashboard.actions';
import { isDashboardDataLoadingSelector, selectDashboardData } from '../../store/dashboard/dashboard.selectors';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  dashboardData$: Observable<DashboardModel | undefined>;
  loading: Observable<boolean>;
  bestSellingProductsColumns: string[];
  latestSalesColumns: string[];
  recentlyCreatedProductsColumns: string[];

  constructor(private router: Router, private _store: Store<AppState>) {
    this.dashboardData$ = this._store.select(selectDashboardData);
    this.loading = this._store.select(isDashboardDataLoadingSelector);
    this.bestSellingProductsColumns = ['productName', 'totalSold'];
    this.latestSalesColumns = ['products', 'saleDate', 'total'];
    this.recentlyCreatedProductsColumns = ['name', 'quantity', 'createdDate'];
  }

  ngOnInit() {
    this._store.dispatch(loadDashboardData());
  }

  navigate(path: string){
    this.router.navigate([path]);
  }
}
