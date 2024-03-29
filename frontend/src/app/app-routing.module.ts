import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RolesEnum as Roles } from '@shared/enums/roles.enum';
import { ViewProfileComponent } from './components/view-profile/view-profile.component';
import { UsersComponent } from './components/users/users.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ProductsComponent } from './components/products/products.component';
import { SalesComponent } from './components/sales/sales.component';
import { ReportsComponent } from './components/reports/reports.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' },
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { title: 'Dashboard', icon: 'dashboard', navInclude: true },
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard],
    data: { role: Roles.Admin, title: 'Users', icon: 'account_circle', navInclude: true },
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    canActivate: [AuthGuard],
    data: { title: 'Categories', icon: 'category', navInclude: true },
  },
  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [AuthGuard],
    data: { title: 'Products', icon: 'storefront', navInclude: true },
  },
  {
    path: 'sales',
    component: SalesComponent,
    canActivate: [AuthGuard],
    data: { title: 'Sales', icon: 'shopping_cart', navInclude: true },
  },
  {
    path: 'reports',
    component: ReportsComponent,
    canActivate: [AuthGuard],
    data: { title: 'Sale Reports', icon: 'receipt_long', navInclude: true },
  },
  {
    path: 'profile',
    component: ViewProfileComponent,
    canActivate: [AuthGuard],
    data: { title: 'View Profile' },
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
