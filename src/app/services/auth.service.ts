import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { User } from '../models/user.model';
import { CookieService } from 'ngx-cookie-service';

const api = 'http://localhost:3000/api/v1';

const emptyUser = {
  _id: '',
  playername: '',
  email: '',
  role: '',
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userSubject = new BehaviorSubject<User>(emptyUser);

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  login(email: string, password: string) {
    return this.http
      .post<{ status: string; data: { user: User } }>(`${api}/users/login`, {
        email,
        password,
      })
      .pipe(
        tap((res) => {
          this.userSubject.next(res.data.user);
          localStorage.setItem('userData', JSON.stringify(res.data.user));
        })
      );
  }

  autoLogin() {
    let user = localStorage.getItem('userData');
    if (!user) {
      return;
    }
    if (this.cookieService.check('jwt')) {
      this.userSubject.next(JSON.parse(user));
    }
  }

  logout() {
    return this.http.post<{ status: string }>(`${api}/users/logout`, {}).pipe(
      tap((res) => {
        this.userSubject.next(emptyUser);
        localStorage.removeItem('userData');
      })
    );
  }

  signup(
    email: string,
    playername: string,
    password: string,
    passwordConfirm: string
  ) {
    return this.http
      .post<{ status: string; data: { user: User } }>(`${api}/users/signup`, {
        email,
        playername,
        password,
        passwordConfirm,
      })
      .pipe(
        tap((res) => {
          this.userSubject.next(res.data.user);
          localStorage.setItem('userData', JSON.stringify(res.data.user));
        })
      );
  }

  isLoggedIn() {
    return this.http
      .get<{ success: string; data?: { user: User } }>(
        `${api}/users/loggedincheck`
      )
      .pipe(
        tap((res) => {
          if (res.data && res.data.user) {
            this.userSubject.next(res.data.user);
          }
        })
      );
  }
}
