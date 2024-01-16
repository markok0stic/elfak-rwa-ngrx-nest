import { Component, ViewChild } from '@angular/core';
import { logoutUser } from '../../store/user/user.actions';
import { Store } from '@ngrx/store';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  @ViewChild('drawer') drawer!: MatDrawer;
  drawerOpened: boolean;

  constructor(private store: Store) {
  this.drawerOpened = true;
  }
  onLogout() {
    this.store.dispatch(logoutUser());
  }

  handleDrawerToggle() {
    this.drawer.toggle();
    this.drawerOpened = !this.drawerOpened;
  }
}
