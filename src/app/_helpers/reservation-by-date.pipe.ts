import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'reservationByDate' })
export class ReservationByDatePipe implements PipeTransform {
  transform(reservations: any[], date: string) {
    return reservations.filter(reservation => reservation.date.toUpperCase().indexOf(date.toUpperCase()) !== -1);
  }
}
