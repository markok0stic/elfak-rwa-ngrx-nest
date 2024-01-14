import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from '../../app.state';
import { getToken } from './user.context';
import { Roles } from '../../models/user/roles';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private router: Router, private store: Store<AppState>) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.store.select(state => state.user.user).pipe(
      map(user => {
        const token = getToken();
        const isTokenExpired = !token || this.jwtHelper.isTokenExpired(token);

        if (!user || isTokenExpired) {
          this.router.navigate(['login']);
          return false;
        }

        const requiredRole = route.data['role'];
        if (requiredRole) {
          const hasRequiredRole = user.role === requiredRole || user.role === Roles.Admin;
          if (!hasRequiredRole) {
            this.router.navigate(['/dashboard']);
            return false;
          }
        }

        return true;
      })
    );
  }
}
