import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Reservation } from '../_models';

@Injectable()
export class ReservationService {
    constructor(private http: HttpClient) { }

    getAll(date: string) {
        return this.http.get<any[]>(`${environment.apiUrl}/reservations/`+date);
    }

    makeReservation(parking: string, date: string, user: string) {
        return this.http.post(`${environment.apiUrl}/reservations`, {"parkingId": parking,"reservationDate":date,"userId": user});
    }
}
