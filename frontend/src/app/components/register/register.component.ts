import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { isUserLoadingSelector } from '../../store/current-user/current.user.selectors';
import { Observable } from 'rxjs';
import { RolesEnum as Roles } from '@shared/enums/roles.enum';
import { MatStepper } from '@angular/material/stepper';
import { RegisterUser } from '../../models/user/user.model';
import { NotificationsService } from '../../services/notifications/notifications.service';
import { RegistrationState } from '../../store/users/users.state';
import { selectSuccessfulRegistrationData } from '../../store/users/users.selectors';
import { registerUser } from '../../store/users/users.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @ViewChild('stepper') stepper!: MatStepper;
  hide: boolean;
  $loading: Observable<boolean>;
  roleKeys: string[];
  basicInfoForm: FormGroup;
  credentialsForm: FormGroup;
  registered$: Observable<RegistrationState | null>;
  registrationSuccess: boolean;
  copyCredentialsData: { email: string, password: string } | null;

  constructor(
    private store: Store<AppState>,
    private _formBuilder: FormBuilder,
    private _notificationService: NotificationsService,
  ) {
    this.hide = true;
    this.$loading = this.store.select(isUserLoadingSelector);
    this.basicInfoForm = this.basicInfoFormGroup();
    this.credentialsForm = this.credentialsFormGroup();
    this.roleKeys = Object.keys(Roles);
    this.registered$ = this.store.select(selectSuccessfulRegistrationData);
    this.registrationSuccess = false;
    this.copyCredentialsData = null;
  }

  basicInfoFormGroup() {
    return this._formBuilder.group({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      country: new FormControl(null, Validators.required),
      address: new FormControl(null),
      city: new FormControl(null),
      zip: new FormControl(null),
    });
  }

  credentialsFormGroup() {
    return this._formBuilder.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      role: new FormControl(Roles.User, Validators.required),
      registered: new FormControl(false, Validators.required),
    });
  }

  ngOnInit(): void {
    this.registered$.subscribe((success) => {
      this.registrationSuccess = !!success?.successfulRegistration;
      if (success) {
        this.copyCredentialsData = success;
        this.stepper.next();
      }
    });
  }

  handleRegister() {
    if (this.basicInfoForm.invalid || this.credentialsForm.invalid)
      return;

    const registerData: RegisterUser = {
      ...this.basicInfoForm.value,
      ...this.credentialsForm.value,
    };

    this.store.dispatch(registerUser({ registerData }));
    this.credentialsForm.patchValue({ registrationCompleted: true });
  }

  copyCredentials() {
    if (this.copyCredentialsData) {
      const credentialsText = `Email: ${this.copyCredentialsData.email}\nPassword: ${this.copyCredentialsData.password}`;
      navigator.clipboard.writeText(credentialsText).then(
        () => this._notificationService.showSuccessSnackBar('Credentials copied to clipboard!'),
        (err) => this._notificationService.showErrorSnackBar(err),
      );
    }
  }

  sendEmail() {
    if (this.copyCredentialsData) {
      const emailBody = `Email: ${this.copyCredentialsData.email}%0D%0APassword: ${this.copyCredentialsData.password}`;
      window.location.href = `mailto:?subject=New User Credentials&body=${emailBody}`;
    }
  }

  handleReset() {
    this.registrationSuccess = false;
    this.basicInfoForm = this.basicInfoFormGroup();
    this.credentialsForm = this.credentialsFormGroup();
    this.copyCredentialsData = null;
    this.stepper.reset();
  }
}
