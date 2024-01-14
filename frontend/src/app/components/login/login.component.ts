import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { loginUser } from 'src/app/store/user/user.actions';
import { Observable } from 'rxjs';
import { isLoadingSelector, isUserLoggedIn } from '../../store/user/user.selectors';
import { LoginUser } from '../../models/user/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide: boolean;
  $loading: Observable<boolean>;
  $loggedIn: Observable<boolean>

  constructor(private store: Store<AppState>, private router: Router) {
    this.hide = true;
    this.$loading = this.store.select(isLoadingSelector);
    this.$loggedIn = this.store.select(isUserLoggedIn);
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
    if(this.$loggedIn) {
      this.router.navigate(['/dashboard']);
    }
    console.log(this.loginForm.controls['email'].invalid)
  }

  handleSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.store.dispatch(loginUser(this.loginForm.value));
  }
}
