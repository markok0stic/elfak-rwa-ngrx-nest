import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RolesEnum as Roles } from '@shared/enums/roles.enum';
import { ViewProfileComponent } from './components/view-profile/view-profile.component';
import { UsersComponent } from './components/users/users.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { SuppliersComponent } from './components/suppliers/suppliers.component';
import { BrandsComponent } from './components/brands/brands.component';
import { ModelsComponent } from './components/models/models.component';

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
    path: 'categories',
    component: CategoriesComponent,
    canActivate: [AuthGuard],
    data: { title: 'Categories', icon: 'category', navInclude: true },
  },
  {
    path: 'brands',
    component: BrandsComponent,
    canActivate: [AuthGuard],
    data: { title: 'Brands', icon: 'currency_bitcoin', navInclude: true },
  },
  {
    path: 'models',
    component: ModelsComponent,
    canActivate: [AuthGuard],
    data: { title: 'Models', icon: 'work', navInclude: true },
  },
  {
    path: 'suppliers',
    component: SuppliersComponent,
    canActivate: [AuthGuard],
    data: { title: 'Suppliers', icon: 'people_alt', navInclude: true },
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard],
    data: { role: Roles.Admin, title: 'Users', icon: 'account_circle', navInclude: true },
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
