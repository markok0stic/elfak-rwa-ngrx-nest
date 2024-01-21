import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../../models/user/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { selectUser } from '../../store/user/user.selectors';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { editProfile } from '../../store/user/user.actions';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent {
  user$: Observable<UserModel | null>;
  profileForm: FormGroup | null;
  sectionTitle: string;
  userEmail: string | null;
  userRole: string | null;

  constructor(private store: Store<AppState>, private _formBuilder: FormBuilder) {
    this.user$ = this.store.select(selectUser);
    this.userEmail = null;
    this.userRole = null;
    this.profileForm = null;
    this.sectionTitle = 'Profile';
  }

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      if (user) {
        this.userEmail = user.email;
        this.userRole = user.role;
        this.profileForm = this.profileFormGroup(user);
        this.profileForm.disable();
      }
    });
  }

  profileFormGroup(user: UserModel | null) {
      return this._formBuilder.group({
        firstName: [user?.firstName, Validators.required],
        lastName: [user?.lastName, Validators.required],
        phone: [user?.phone, Validators.required],
        country: [user?.country, Validators.required],
        address: [user?.address],
        city: [user?.city],
        zip: [user?.zip],
      });
  }

  toggleEdit() {
    if(this.profileForm) {
      if (this.profileForm.disabled) {
        this.sectionTitle = 'Edit profile';
        this.profileForm.enable();
      } else {
        this.sectionTitle = 'Profile';
        this.profileForm.disable();
      }
    }
  }

  handleEdit() {
    if(!this.profileForm || this.profileForm?.invalid) {
      return;
    }

    const editUserData: UserModel = {
      ...this.profileForm.value
    }

    this.store.dispatch(editProfile({userData: editUserData}));
  }
}
