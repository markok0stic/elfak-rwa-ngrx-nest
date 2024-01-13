import { Component } from '@angular/core';
import { logoutUser } from '../../store/user/user.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  constructor(private store: Store) {
  }
  onLogout() {
    this.store.dispatch(logoutUser());
  }
}
