import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    get isLoggedIn() {
      return this.loggedIn.asObservable();
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/login`, { userId: username, password: password })
            .pipe(map(auth => {
                // login successful if there's a jwt token in the response
                if (auth && auth.auth && auth.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    // Maybe switch to sessionStorage

                    sessionStorage.setItem('currentUser', JSON.stringify(auth));
                    this.loggedIn.next(true);
                }

                return auth;
            }));
    }

    triggerLoggedIn(){
      this.loggedIn.next(true);
    }

    logout() {
        // remove user from local storage to log user out
        this.loggedIn.next(false);
        sessionStorage.removeItem('currentUser');
    }
}
