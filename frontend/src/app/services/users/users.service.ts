import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {LoginUser, User} from "../../models/user/user";
import { RegisterUser } from '../../store/registration/registration.state';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl = `${environment.api}/users`;

  constructor(private httpClient: HttpClient) {}

  login(email: string, password: string) {
    return this.httpClient.post<LoginUser>(`${this.baseUrl}/login`, {
      email,
      password,
    });
  }

  register(data: RegisterUser) {
    return this.httpClient.post<User>(`${this.baseUrl}/register`, {
      ...data,
    });
  }

  editProfile(userData: FormData) {
    return this.httpClient.put<User>(
      `${environment.api}/users/edit-profile`,
      userData
    );
  }
}
