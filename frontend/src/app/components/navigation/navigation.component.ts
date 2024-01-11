import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { logoutUser } from '../../store/user/user.actions';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  constructor(private store: Store, private router: Router) {}

  onLogout() {
    this.store.dispatch(logoutUser());
  }
}
