import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./services/auth/auth.guard";
import {Roles} from "./models/user/role";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import { LayoutComponent } from './components/layout/layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'login',
    component: LoginComponent,
    data: { title: 'Login' }
  },
  { path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    data: { title: 'Layout' },
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { title: 'Layout' },
      },
      { path: 'register',
        component: RegisterComponent,
        canActivate: [AuthGuard],
        data: { role: Roles.Admin, title: 'Register' }},
    ]
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
