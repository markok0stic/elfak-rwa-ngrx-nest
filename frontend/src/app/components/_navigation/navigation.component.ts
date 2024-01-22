import { Component, ViewChild } from '@angular/core';
import { logoutUser } from '../../store/current-user/current.user.actions';
import { Store } from '@ngrx/store';
import { MatDrawer } from '@angular/material/sidenav';
import { hasAnyElement } from '@shared/utils/common.utils';
import { Observable } from 'rxjs';
import { selectLoggedInUserRole } from '../../store/current-user/current.user.selectors';
import { RolesEnum } from '@shared/enums/roles.enum';
import { AppState } from '../../app.state';
import { Router } from '@angular/router';
import { routes } from '../../app-routing.module';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  @ViewChild('drawer') drawer!: MatDrawer;
  drawerOpened: boolean;
  public navItems: Array<{ title: string, path: string, icon: string, role: RolesEnum }>;
  currentRole: Observable<RolesEnum | null>;
  protected readonly hasAnyElement = hasAnyElement;
  protected readonly RolesEnum = RolesEnum;

  constructor(private _store: Store<AppState>, private _router: Router) {
    this.drawerOpened = true;
    this.currentRole = this._store.select(selectLoggedInUserRole);
    this.navItems = routes
      .filter(route => route.data && route.data['title'] && route.data['navInclude'])
      .map(route => ({
          title: route.data!['title'],
          path: `${route.path}` ?? '/',
          icon: route.data!['icon'],
          role: !!route.data!['role'] ? route.data!['role'] as RolesEnum : RolesEnum.User
        })
      );
  }

  onLogout() {
    this._store.dispatch(logoutUser());
  }

  handleDrawerToggle() {
    this.drawer.toggle();
    this.drawerOpened = !this.drawerOpened;
  }

  isActive(navItemPath: string): boolean {
    return this._router.url === `/${navItemPath}`;
  }
}
