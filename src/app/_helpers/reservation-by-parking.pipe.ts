import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'reservationByParking' })
export class ReservationByParkingPipe implements PipeTransform {
  transform(reservations: any[], parking: string) {
    return reservations.filter(reservation => reservation.parking.toUpperCase().indexOf(parking.toUpperCase()) !== -1);
  }
}
