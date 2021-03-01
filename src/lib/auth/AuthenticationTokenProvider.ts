import { User } from '../../types/graphql.v2';
import { AuthenticationClientOptions } from './types';

const tokenKey = '_authing_token';
const userKey = '_authing_user';

export class AuthenticationTokenProvider {
  options: AuthenticationClientOptions;

  constructor(options: AuthenticationClientOptions) {
    this.options = options;
  }

  setAccessToken(token: string) {
    localStorage.setItem(tokenKey, token)
  }

  getAccessToken() {
    return localStorage.getItem(tokenKey) || '';
  }

  getUser(): User | null {
    return localStorage.getItem(userKey)
      ? JSON.parse(localStorage.getItem(userKey))
      : null;
  }

  setUser(user: User) {
    localStorage.setItem(userKey, JSON.stringify(user));
    localStorage.setItem(tokenKey, user.token);
  }

  clearUser() {
    localStorage.removeItem(userKey);
    localStorage.removeItem(tokenKey);
  }
}
