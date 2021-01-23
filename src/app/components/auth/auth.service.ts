import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  LoginPayload,
  RegisterPayload,
  UserManagerResponse,
} from './auth.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<UserManagerResponse>(null);

  constructor(private http: HttpClient) {}

  url = 'https://zaliczenie.btry.eu/api/Auth/Login';
  registerUrl = 'https://zaliczenie.btry.eu/api/Auth/Register';

  loginUser(loginPayload: LoginPayload): Observable<UserManagerResponse> {
    return this.http.post<UserManagerResponse>(this.url, loginPayload).pipe(
      tap((response) => {
        this.handleAuthentication(
          response.message,
          response.isSuccess,
          response.errors,
          response.userInfo,
          response.expireDate
        );
      })
    );
  }

  registerUser(
    registerPayload: RegisterPayload
  ): Observable<UserManagerResponse> {
    return this.http.post<UserManagerResponse>(
      this.registerUrl,
      registerPayload
    );
  }

  private handleAuthentication(
    message: string,
    isSuccess: boolean,
    errors: string[],
    userInfo: string[],
    expiresDate: string[]
  ) {
    const user = new UserManagerResponse(
      message,
      isSuccess,
      errors,
      userInfo,
      expiresDate
    );
    this.user.next(user);

    const userToken = new UserManagerResponse(
      message,
      isSuccess,
      errors,
      userInfo,
      expiresDate
    );
    localStorage.setItem('user', JSON.stringify(userToken));
  }

  keepLoggedInAfterReload() {
    const user: {
      message: string;
      isSuccess: boolean;
      errors: string[];
      userInfo: string[];
      expiresDate: string[];
    } = JSON.parse(window.localStorage.getItem('user'));

    if (!user) return;

    const loadedUser = new UserManagerResponse(
      user.message,
      user.isSuccess,
      user.errors,
      user.userInfo,
      user.expiresDate
    );

    if (loadedUser) {
      this.user.next(loadedUser);
    }
  }
}
