import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { loginUser } from 'src/app/store/user/user.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  loading: boolean = false;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.store.subscribe((state) => {
      this.loading = state.user.isLoading;
    });
  }

  handleSubmit() {
    if (!this.email.value || !this.password.value) return;

    this.store.dispatch(
      loginUser({
        email: this.email.value,
        password: this.password.value,
      })
    );
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
