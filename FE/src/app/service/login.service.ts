import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';
import {environment} from '../../environments/environments';
import {User} from '../login/user.model';
import {SignUp} from '../models/signup.model';
import {Response} from '../models/response.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly BASE = `${environment.apiUrl}/user-service`;

  /** keeps current login status for app-wide consumption */
  private loggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn$.asObservable();

  constructor(private http: HttpClient) {}

  /** POST /user-service  → create account */
  signUp(dto: SignUp): Observable<Response> {
    return this.http.post<Response>(`${this.BASE}`, dto);
  }

  /** POST /user-service/login → log in */
  login(dto: SignUp): Observable<Response> {
    return this.http.post<Response>(`${this.BASE}/login`, dto).pipe(
      tap((res:Response) => {
        if (res.status === 'SUCCESS') {
          this.loggedIn$.next(true);
          // put token in localStorage/sessionStorage here if backend returns one
        }
      })
    );
  }

  /** GET /user-service/logout → log out */
  logout(): Observable<Response> {
    return this.http.get<Response>(`${this.BASE}/logout`).pipe(
      tap(() => {
        this.loggedIn$.next(false);
        // remove token from storage if you saved one
      })
    );
  }

  /** DELETE /user-service/{uuid} → delete user */
  deleteUser(id: string): Observable<Response> {
    return this.http.delete<Response>(`${this.BASE}/${id}`);
  }

  /** PUT /user-service/{uuid} → update user (partial update) */
  updateUser(id: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.BASE}/${id}`, user);
  }
}
