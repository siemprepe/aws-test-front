﻿import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from '../_models';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    register(user: any) {
        return this.http.post(`${environment.apiUrl}/register`, user);
    }

    activate(token: string) {
        return this.http.get(`${environment.apiUrl}/register/activate/${token}`);
    }
}
