import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as RegistrationActions from '../../store/registration/registration.actions';
import { AppState } from '../../app.state';
import { isLoadingSelector } from '../../store/user/user.selectors';
import { Observable } from 'rxjs';
import { Roles } from '../../models/user/roles';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  hide: boolean;
  registerForm: FormGroup;
  $loading: Observable<boolean>;
  roleKeys: string[];

  constructor(private store: Store<AppState>) {
    this.hide = true;
    this.$loading = this.store.select(isLoadingSelector);
    this.registerForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      role: new FormControl(Roles.User, Validators.required),
      phone: new FormControl('', Validators.required),
      address: new FormControl(undefined),
      city: new FormControl(undefined),
      zip: new FormControl(undefined),
    });
    this.roleKeys = Object.keys(Roles);
  }

  handleSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    this.store.dispatch(RegistrationActions.registerUser({ registerData: this.registerForm.value}));
  }
}
