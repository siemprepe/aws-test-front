import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Parking } from '../_models';

@Injectable()
export class ParkingsService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Parking[]>(`${environment.apiUrl}/parkings`);
    }

    addParking(parking: Parking) {
        return this.http.post(`${environment.apiUrl}/parkings`, parking);
    }
}
