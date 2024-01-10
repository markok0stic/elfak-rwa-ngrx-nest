import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions } from '@ngrx/effects';
import {UsersService} from "../../services/users/users.service";

@Injectable()
export class UserEffects {
  constructor(
    private action$: Actions,
    private userService: UsersService,
    private router: Router
  ) {}

  /*loginUser$ = createEffect(() =>
    this.action$.pipe(
      ofType(UserActions.loginUser),
      mergeMap(({ email, password }) =>
        this.userService.login(email, password).pipe(
          map((data: LoginUser) => {
            setToken(data.access_token);
            setUser(data.users);
            this.router.navigate(['layout'], { replaceUrl: true });
            return UserActions.loginSuccess({ data });
          }),
          catchError(({ error }) => {
            setToken(null);
            setUser(null);
            return of(UserActions.loginFailure({ error: 'BadCredentials' }));
          })
        )
      )
    )
  );

  logoutUser$ = createEffect(() =>
    this.action$.pipe(
      ofType(UserActions.logoutUser),
      mergeMap(()=>{
        setToken(null);
        setUser(null);
        this.router.navigate(['login'], { replaceUrl: true });
        return of({ type: 'logged out' });
      })
    ));

  registerUser$ = createEffect(() =>
    this.action$.pipe(
      ofType(UserActions.registerUser),
      mergeMap(({ registerData }) =>
        this.userService.register(registerData).pipe(
          map(() => {
            this.router.navigate(['login'], { replaceUrl: true });
            return UserActions.registerSuccess();
          }),
          catchError(({ error }) => {
            return of(UserActions.registerFailure());
          })
        )
      )
    )
  );

  editProfile$ = createEffect(() =>
    this.action$.pipe(
      ofType(UserActions.editProfile),
      mergeMap(({ userData }) =>
        this.userService.editProfile(userData).pipe(
          map((users: User) => {
            setUser(users);
            return UserActions.editProfileSuccess({ users: users });
          }),
          catchError(({ error }) => {
            return of({ type: error });
          })
        )
      )
    )
  );*/
}
