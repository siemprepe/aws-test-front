import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as jwt_decode from 'jwt-decode';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private roles: string[] = [];

    get isLoggedIn() {
      return this.loggedIn.asObservable();
    }

    login(username: string, password: string) {
      return this.http.post<any>(`${environment.apiUrl}/login`, { userId: username, password: password })
        .pipe(map(user => {
            if (user && user.auth && user.token) {
                sessionStorage.setItem('currentUser', JSON.stringify(user));
                this.roles = user.roles;
                this.loggedIn.next(true);
            }
            return user;
        }));
    }

    isAuthenticated(): boolean {
      const helper = new JwtHelperService();
      const user = JSON.parse(sessionStorage.getItem('currentUser'));
      const token = user !== null ? user.token : null;
      return !helper.isTokenExpired(token);
    }

    hasRole(expectedRole): boolean{
      const user = JSON.parse(sessionStorage.getItem('currentUser'));
      const token = user !== null ? user.token : null;
      try{
        const tokenPayload = jwt_decode(token);
        return tokenPayload.roles !== null ? tokenPayload.roles.split(';').find(role => role === expectedRole) : false;
      }catch(err){
        console.log(err);
        return false;
      }
    }

    triggerLoggedIn(){
      this.loggedIn.next(true);
    }

    logout() {
        this.loggedIn.next(false);
        sessionStorage.removeItem('currentUser');
    }
}
