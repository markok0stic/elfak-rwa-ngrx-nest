import { UserModel } from '../../models/user/user.model';

export const setUser = (user: UserModel | null) => {
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
  } else {
    localStorage.removeItem('user');
  }
};

export const getUser = (): UserModel | null => {
  const user = localStorage.getItem('user');

  if (user) {
    return JSON.parse(user);
  } else {
    return null;
  }
};

export const setToken = (token: string | null) => {
  if (token === null) {
    localStorage.removeItem('token');
  } else {
    localStorage.setItem('token', JSON.stringify(token));
  }
};

export const getToken = (): string | null => {
  const token = localStorage.getItem('token');

  if (token) {
    return JSON.parse(token);
  }
  return null;
};
