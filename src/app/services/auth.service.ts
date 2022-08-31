import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { User } from '../models/user.model';

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

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http
      .post<{ status: string; data: { user: User } }>(
        `${api}/users/login`,
        {
          email,
          password,
        }
      )
      .pipe(
        tap((res) => {
          this.userSubject.next(res.data.user);
        })
      );
  }
}
