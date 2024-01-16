import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import {
  isUserLoadingSelector,
  selectSuccessfulRegistration,
} from '../../store/user/user.selectors';
import { Observable } from 'rxjs';
import { RolesEnum as Roles } from '@shared/enums/roles.enum';
import { MatStepper } from '@angular/material/stepper';
import { registerUser } from 'src/app/store/user/user.actions';
import { RegisterUser } from '../../models/user/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  @ViewChild('stepper') stepper!: MatStepper;
  hide: boolean;
  $loading: Observable<boolean>;
  roleKeys: string[];
  basicInfoForm: FormGroup;
  credentialsForm: FormGroup;
  registered$: Observable<boolean | undefined>;
  registrationSuccess: boolean;

  constructor(private store: Store<AppState>,private _formBuilder: FormBuilder) {
    this.hide = true;
    this.$loading = this.store.select(isUserLoadingSelector);
    this.basicInfoForm = this.basicInfoFormGroup();
    this.credentialsForm = this.credentialsFormGroup();
    this.roleKeys = Object.keys(Roles);
    this.registered$ = this.store.select(selectSuccessfulRegistration);
    this.registrationSuccess = false;
  }

  basicInfoFormGroup() {
    return this._formBuilder.group({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      country: new FormControl(null, Validators.required),
      address: new FormControl(null),
      city: new FormControl(null),
      zip: new FormControl(null)
    });
  }

  credentialsFormGroup() {
    return this._formBuilder.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      role: new FormControl(Roles.User, Validators.required),
      registered: new FormControl(false, Validators.required)
    });
  }

  ngOnInit(): void {
    this.registered$.subscribe((success) => {
      this.registrationSuccess = !!success;
      if (success) {
        this.stepper.next();
      }
    });
  }

  handleRegister() {
    if(this.basicInfoForm.invalid || this.credentialsForm.invalid)
      return;

    const registerData: RegisterUser = {
      ...this.basicInfoForm.value,
      ...this.credentialsForm.value
    }

    this.store.dispatch(registerUser({ registerData }))
    this.credentialsForm.patchValue({registrationCompleted: true})
  }

  handleReset(){
    this.registrationSuccess = false;
    this.basicInfoForm = this.basicInfoFormGroup();
    this.credentialsForm = this.credentialsFormGroup();
    this.stepper.reset();
  }
}
