import { Component, ViewChild } from '@angular/core';
import { logoutUser } from '../../store/user/user.actions';
import { Store } from '@ngrx/store';
import { MatDrawer } from '@angular/material/sidenav';
import { Routes } from '@angular/router';
import { routes } from '../../app-routing.module';
import { hasAnyElement } from '@shared/utils/common.utils';
import { Observable } from 'rxjs';
import { isUserLoggedIn, selectLoggedInUserRole } from '../../store/user/user.selectors';
import { RolesEnum } from '@shared/enums/roles.enum';
import { AppState } from '../../app.state';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  @ViewChild('drawer') drawer!: MatDrawer;
  drawerOpened: boolean;
  public navItems: Routes;
  protected readonly hasAnyElement = hasAnyElement;
  protected readonly RolesEnum = RolesEnum;
  currentRole: Observable<RolesEnum>;

  constructor(private _store: Store<AppState>) {
  this.drawerOpened = true;
  this.navItems = routes;
  this.currentRole = this._store.select(selectLoggedInUserRole);
  }

  onLogout() {
    this._store.dispatch(logoutUser());
  }

  handleDrawerToggle() {
    this.drawer.toggle();
    this.drawerOpened = !this.drawerOpened;
  }
}
