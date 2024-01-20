import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../../models/user/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { selectUser } from '../../store/user/user.selectors';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent {
  user$: Observable<UserModel | null>;
  profileForm: FormGroup | null;
  sectionTitle: string;

  constructor(private store: Store<AppState>, private _formBuilder: FormBuilder) {
    this.user$ = this.store.select(selectUser);
    this.profileForm = null;
    this.sectionTitle = 'Profile'
  }

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      if (user) {
        this.profileForm = this._formBuilder.group({
          firstName: [{value: user.firstName, disabled: true}, Validators.required],
          lastName: [{value: user.lastName, disabled: true}, Validators.required],
          email: [{value: user.email, disabled: true}, [Validators.required, Validators.email]],
          phone: [{value: user.phone, disabled: true}, Validators.required],
          address: [{value: user.address, disabled: true}],
          city: [{value: user.city, disabled: true}],
          zip: [{value: user.zip, disabled: true}]
        });
      }
    });
  }

  toggleEdit() {
    if(this.profileForm)
    if (this.profileForm.disabled) {
      this.sectionTitle = 'Edit profile';
      this.profileForm.enable();
    } else {
      this.sectionTitle = 'Profile';
      this.profileForm.disable();
    }
  }

  onSubmit() {
    if (this.profileForm?.valid) {
      const updatedUser = { ...this.profileForm.value };
    }
  }
}
