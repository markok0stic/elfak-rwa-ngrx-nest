import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import {ActivatedRouteSnapshot, CanActivate, Router, UrlTree} from '@angular/router';
import {Observable, take} from 'rxjs';
import {Store} from "@ngrx/store";
import {getToken} from "./user.context";
import {AppState} from "../../app.state";
import {User} from "../../models/user/user";
import {Roles} from "../../models/user/role";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private router: Router, private store: Store<AppState>) {}

  canActivate(
    route: ActivatedRouteSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const token: string | null = getToken();

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return this.store.select(state => state.user).pipe(
        take(1),
        map(userState => {
          const user: User | null = userState.user;
          const authorizedRole = route.data['role'];

          if (user && (authorizedRole ? user.role === authorizedRole || user.role === Roles.Admin : true)) {
            return true;
          } else {
            this.router.navigate(['login']);
            return false;
          }
        })
      );
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
