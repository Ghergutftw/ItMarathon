import {Injectable} from '@angular/core';
import {environment} from '../../environments/environments';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {SignUp} from '../models/signup.model';
import {Observable} from 'rxjs';
import {User} from '../models/user.model';

@Injectable({providedIn: 'root'})
export class UserService {
    private apiServerUrl = environment.apiUrl;

    constructor(private http: HttpClient) {
    }

    public createUser(signUp: SignUp): Observable<HttpResponse<any>> {
        return this.http.post<HttpResponse<any>>(`${this.apiServerUrl}/user-service`, {observe: "response"})
    }

    public deleteUser(userId: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.apiServerUrl}/user-service/${userId}`, {observe: "response"})
    }

    public login(user: User): Observable<HttpResponse<any>> {
        return this.http.post<HttpResponse<any>>(`${this.apiServerUrl}/login`, user)
    }

    // public logout(user: User): Observable<HttpResponse<any>> {
    //   return this.http.get<HttpResponse<any>>(`${this.apiServerUrl}/logout`, user)
    // }
}
