import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { UserModel } from '../../models/user/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { selectUser } from '../../store/current-user/current.user.selectors';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { editSelfProfile } from '../../store/current-user/current.user.actions';
import { editUserProfile } from '../../store/users/users.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css'],
})
export class ViewProfileComponent implements OnInit {
  user$: Observable<UserModel | null>;
  profileForm: FormGroup | null;
  sectionTitle: string;
  userEmail: string | null;
  userRole: string | null;
  isNotSelfEdit: boolean;
  private userSubject = new BehaviorSubject<UserModel | null>(null);

  constructor(private store: Store<AppState>, private _formBuilder: FormBuilder, private _router: Router) {
    this.user$ = of(null);
    this.userEmail = null;
    this.userRole = null;
    this.profileForm = null;
    this.sectionTitle = 'Profile';
    this.isNotSelfEdit = false;
  }

  @Input()
  set user(value: UserModel | null) {
    this.userSubject.next(value);
    this.isNotSelfEdit = true;
  }

  ngOnInit(): void {
    if (this.isNotSelfEdit) {
      this.user$ = this.userSubject.asObservable();
    } else {
      this.user$ = this.store.select(selectUser);
    }

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
      id: [user?.id, Validators.required],
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
    if (this.profileForm) {
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
    if (!this.profileForm || this.profileForm?.invalid) {
      return;
    }

    const editUserData: UserModel = {
      ...this.profileForm.value,
    };

    if (this.isNotSelfEdit) {
      this.store.dispatch(editUserProfile({ userData: editUserData }));
      this.profileForm.disable();
    } else {
      this.store.dispatch(editSelfProfile({ userData: editUserData }));
    }
  }
}
