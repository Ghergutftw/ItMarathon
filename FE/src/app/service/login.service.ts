import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {environment} from '../../environments/environments';
import {SignUp} from '../models/signup.model';
import {Response} from '../models/response.model';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly BASE = `${environment.apiUrl}/user-service`;

  private loggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn$.asObservable();

  constructor(private http: HttpClient) {
  }

  signUp(dto: SignUp): Observable<Response> {
    return this.http.post(`${this.BASE}/signup`, dto);
  }

  login(dto: SignUp): Observable<HttpResponse<any>> {
    return this.http.post<Response>(
      `${this.BASE}/login`,
      dto,
      {
        observe: 'response',
        headers: {'Accept': 'application/json'}
      }
    );
  }

  logout(): Observable<Response> {
    return this.http.get<Response>(`${this.BASE}/logout`).pipe(
      tap(() => {
        this.loggedIn$.next(false);
      })
    );
  }

  /** DELETE /user-service/{uuid} → delete user */
  deleteUser(id: string): Observable<Response> {
    return this.http.delete<Response>(`${this.BASE}/${id}`);
  }

  checkIfNameExists(name: string): Observable<Response> {
    return this.http.get<Response>(`${this.BASE}/check-name/${name}`);
  }

  updatePassword(name: string, newPassword: string): Observable<Response> {
    return this.http.put<Response>(`${this.BASE}/update-password`, {
      name: name,
      newPassword: newPassword
    });
  }


  /** PUT /user-service/{uuid} → update user (partial update) */
  updateUser(id: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.BASE}/${id}`, user);
  }
}
