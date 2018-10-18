import { Component, OnInit, Input } from '@angular/core';
import { first } from 'rxjs/operators';
import { MonthNames } from '../_helpers';
import { ReservationService, AlertService } from '../_services';
import { ReservationDeleteModalComponent } from '../reservation-delete-modal';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({templateUrl: 'reservations.component.html'})
export class ReservationsComponent implements OnInit {
    reservations: any[] = [];
    @Input()parkingNameFilter: string = "";
    @Input()parkingDateFilter: string = "";
    currentMonth: number;
    currentYear: number;
    month: string;

    constructor(private reservationsService: ReservationService,
                private alertService: AlertService,
                private modalService: NgbModal) {
                  this.currentMonth = new Date().getMonth() + 1;
                  this.currentYear = new Date().getFullYear();
                }

    ngOnInit() {
      this.loadAllReservations();
      this.month = MonthNames[this.currentMonth-1];
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
      let date = this.currentYear + "-" + (this.currentMonth);
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

    changeMonth(value: number){
      this.currentMonth = this.currentMonth + value;
      // if(this.currentMonth != (new Date().getMonth() + 1)){
      //   this.currentDay = 1
      // }else{
      //   this.currentDay = new Date().getDate();
      // }
      if(this.currentMonth > 12){
        this.currentYear++
        this.currentMonth = 1
      }
      if(this.currentMonth < 1){
        this.currentYear--
        this.currentMonth = 12
      }
      this.month = MonthNames[this.currentMonth-1];
      this.loadAllReservations();
    }
}
