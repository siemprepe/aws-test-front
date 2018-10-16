import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/login`, { userId: username, password: password })
            .pipe(map(auth => {
                // login successful if there's a jwt token in the response
                if (auth && auth.auth && auth.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    // Maybe switch to sessionStorage

                    sessionStorage.setItem('currentUser', JSON.stringify(auth));
                }

                return auth;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        sessionStorage.removeItem('currentUser');
    }
}
