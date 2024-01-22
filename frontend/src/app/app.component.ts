import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { getToken, getUser } from './services/auth/user.context';
import { AppState } from './app.state';
import { Store } from '@ngrx/store';
import * as UserActions from './store/current-user/current.user.actions';
import { Observable } from 'rxjs';
import { isUserLoggedIn } from './store/current-user/current.user.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Inventory Manager';
  isLoggedIn$: Observable<boolean>;

  constructor(
    private titleService: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      filter(route => route.outlet === 'primary'),
      mergeMap(route => route.data),
    ).subscribe(event => {
      this.titleService.setTitle(`${event['title']}`);
    });

    this.isLoggedIn$ = this.store.select(isUserLoggedIn);
  }

  ngOnInit(): void {
    const user = getUser();
    const token = getToken();

    if (user && token) {
      this.store.dispatch(UserActions.setInitialUserState({ user, token }));
    }
  }
}
