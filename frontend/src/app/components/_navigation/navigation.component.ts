import { Component, ViewChild } from '@angular/core';
import { logoutUser } from '../../store/user/user.actions';
import { Store } from '@ngrx/store';
import { MatDrawer } from '@angular/material/sidenav';
import { hasAnyElement } from '@shared/utils/common.utils';
import { Observable } from 'rxjs';
import { selectLoggedInUserRole } from '../../store/user/user.selectors';
import { RolesEnum } from '@shared/enums/roles.enum';
import { AppState } from '../../app.state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  @ViewChild('drawer') drawer!: MatDrawer;
  drawerOpened: boolean;
  public navItems: Array<{ title: string, path: string, icon: string }>;
  currentRole: Observable<RolesEnum>;
  protected readonly hasAnyElement = hasAnyElement;
  protected readonly RolesEnum = RolesEnum;

  constructor(private _store: Store<AppState>, private _router: Router) {
    this.drawerOpened = true;
    this.currentRole = this._store.select(selectLoggedInUserRole);
    this.navItems = [
      { path: '/dashboard', title: 'Dashboard', icon: 'dashboard' },
      { path: '/register', title: 'Register', icon: 'add-user' }
    ];
  }

  onLogout() {
    this._store.dispatch(logoutUser());
  }

  handleDrawerToggle() {
    this.drawer.toggle();
    this.drawerOpened = !this.drawerOpened;
  }

  isActive(navItemPath: string): boolean {
    return this._router.url === navItemPath;
  }
}
