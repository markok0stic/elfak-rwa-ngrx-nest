import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./services/auth/auth.guard";
import {Roles} from "./models/user/role";
import {LoginComponent} from "./components/login/login.component";
import {HomeComponent} from "./components/home/home.component";
import {RegisterComponent} from "./components/register/register.component";

const routes: Routes = [
  { path: 'login',
    component: LoginComponent,
    data: { title: 'Login' }
  },
  { path: 'register',
    component: RegisterComponent,
    canActivate: [AuthGuard],
    data: { role: Roles.Admin, title: 'Register' },
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
