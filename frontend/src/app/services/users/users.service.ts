import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { LoginUser, RegisterUser, UserModel } from '../../models/user/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl = `${environment.api}/users`;

  constructor(private httpClient: HttpClient) {
  }

  login(email: string, password: string) {
    return this.httpClient.post<LoginUser>(`${this.baseUrl}/login`, {
      email,
      password,
    });
  }

  register(data: RegisterUser) {
    return this.httpClient.post<UserModel>(`${this.baseUrl}/register`, {
      ...data,
    });
  }

  editUser(userData: UserModel) {
    return this.httpClient.put<UserModel>(
      `${environment.api}/users/edit-profile`,
      userData,
    );
  }

  deleteUser(id: number) {
    return this.httpClient.delete<UserModel>(
      `${environment.api}/users/delete/1`,
    );
  }

  getAll() {
    return this.httpClient.get<UserModel[]>(
      `${environment.api}/users`,
    )
  }
}
