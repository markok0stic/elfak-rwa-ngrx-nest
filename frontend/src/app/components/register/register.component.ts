import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as UserActions from '../../store/user/user.actions';
import { RegisterUser } from '../../models/user/user';
import { AppState } from '../../app.state';
import { isLoadingSelector } from '../../store/user/user.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  hide: boolean;
  $loading: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.hide = true;
    this.$loading = this.store.select(isLoadingSelector);
    this.registerForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      address: new FormControl(undefined),
      city: new FormControl(undefined),
      zip: new FormControl(undefined),
    });
  }

  handleSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    this.store.dispatch(UserActions.registerUser({ registerData: this.registerForm.value}));
  }
}
