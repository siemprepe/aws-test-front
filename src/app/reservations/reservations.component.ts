import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { ReservationService, AlertService } from '../_services';
import { ReservationDeleteModalComponent } from '../reservation-delete-modal';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({templateUrl: 'reservations.component.html'})
export class ReservationsComponent implements OnInit {
    reservations: any[] = [];

    constructor(private reservationsService: ReservationService,
                private alertService: AlertService,
                private modalService: NgbModal) {}

    ngOnInit() {
      this.loadAllReservations();
    }

    deleteReservation(parking, date) {
      const modal = this.modalService.open(ReservationDeleteModalComponent)
      modal.componentInstance.date = date
      modal.componentInstance.parking = parking

      modal.result.then((result) => {
        console.log(`Delete reservation on ${date} for ${parking}`);
        this.reservationsService.deleteReservation(parking, date)
            .pipe(first())
            .subscribe(
                data => {
                    this.loadAllReservations();
                },
                error => {
                    this.alertService.error(error);
                });
      }, (reason) => {
        console.log("confirm dialog closed")
      });
    }

    private loadAllReservations() {
      let date = '2018-11'
      this.reservationsService.getAll(date).pipe(first()).subscribe(reservations => {
        this.reservations = [];
        reservations.forEach(r => {
          var parkingObject = {parking:null,dates:[]};
          var parkingId = null;
          r.forEach(d => {
            parkingId = d.parkingId;
            parkingObject.dates.push({date:d.reservationDate, user: d.userId})
          })
          if(parkingId !== null){
            parkingObject.parking = parkingId;
            this.reservations.push(parkingObject);
          }
        })
        this.reservations.sort(this.compareReservations);
        console.log(this.reservations);
      });
    }

    private compareReservations(reservationA, reservationB) {
      const nameA = reservationA.parking.toUpperCase();
      const nameB = reservationB.parking.toUpperCase();

      let comparison = 0;
      if (nameA > nameB) {
        comparison = 1;
      } else if (nameA < nameB) {
        comparison = -1;
      }
      return comparison;
    }
}
