import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { MonthNames } from '../_helpers';
import { User, Parking, Reservation } from '../_models';
import { UserService, ParkingsService, ReservationService, AlertService } from '../_services';
import { ReservationConfirmModalComponent } from '../reservation-confirm-modal';

@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    parkings: Parking[] = [];
    reservations: any[] = [];
    reservationDates: any[] = [];
    currentDay: number;
    currentMonth: number;
    currentYear: number;
    numberOfDays: number;
    dates: string[];
    amountOfDays: number = 5;
    month: string;
    startIndex: number = 0;
    endIndex: number = 5;

    constructor(private userService: UserService,
                private reservationService: ReservationService,
                private parkingsService: ParkingsService,
                private alertService: AlertService,
                private modalService: NgbModal) {
        this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        this.currentMonth = new Date().getMonth() + 1;
        this.currentYear = new Date().getFullYear();
        //this.currentDay = new Date().getDate();
        this.currentDay = 1;
        this.numberOfDays = this.getDaysInMonth(this.currentMonth , this.currentYear );
    }

    //TODO: Clean this code up, can be nicer
    ngOnInit() {
        this.loadAllParkings();
        this.loadAllReservations();
        this.setDates();
        this.month = MonthNames[this.currentMonth-1];
    }

    changeIndex(value){
      if((this.startIndex + value) < 0){
        this.startIndex = this.startIndex = 0
      } else if((this.startIndex + value) > 26){
        this.startIndex = this.startIndex = 26
      }else{
        this.startIndex = this.startIndex + value;
      }

      if((this.endIndex + value) > 31){
        this.endIndex = 31;
      }else if((this.endIndex + value) < 5){
        this.endIndex = 5;
      }else{
        this.endIndex = this.endIndex + value;
      }
    }

    changeMonth(value: number){
      this.currentMonth = this.currentMonth + value;
      // if(this.currentMonth != (new Date().getMonth() + 1)){
      //   this.currentDay = 1
      // }else{
      //   this.currentDay = new Date().getDate();
      // }
      this.currentDay = 1;
      this.startIndex = 0;
      this.endIndex = 5;
      if(this.currentMonth > 12){
        this.currentYear++
        this.currentMonth = 1
      }
      if(this.currentMonth < 1){
        this.currentYear--
        this.currentMonth = 12
      }
      this.month = MonthNames[this.currentMonth-1];
      this.numberOfDays = this.getDaysInMonth(this.currentMonth , this.currentYear );
      this.setDates();
      this.loadAllReservations();
    }

    setDates(){
      let dstr = this.currentYear + '-' + (this.currentMonth) + '-';
      this.dates = [];
      for(var i = this.currentDay ;i <= this.numberOfDays;i++){
        this.dates.push(dstr + (i < 10 ? '0'+i:i));
      };
    }

    reserve(date: string, parking: string){
      const modal = this.modalService.open(ReservationConfirmModalComponent)
      modal.componentInstance.date = date
      modal.componentInstance.parking = parking

      modal.result.then((result) => {
        console.log(`Making reservation for ${this.currentUser.userId} on ${date} for ${parking}`;
        this.reservationService.makeReservation(parking,date,this.currentUser.userId)
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

    private loadAllReservations(){
      let date = this.currentYear + "-" + (this.currentMonth);
      this.fetchAllReservations(date);
    }

    private fetchAllReservations(date: string){
      this.reservationService.getAll(date).pipe(first()).subscribe(reservations => {
          this.reservations = reservations;
          this.reservationDates = this.parkings.map(p => {
            var t = {parking: p.parkingId, dates: []};
            this.dates.forEach(date => {
              var flag = false;
              var data = null;
              reservations.forEach(r => {
                r.forEach(d => {
                  if(d.parkingId === p.parkingId && d.reservationDate === date){
                    flag = true;
                    data = d;
                  }
                })
              })
              if(flag && data != null){
                t.dates.push(data);
              }else{
                t.dates.push({reservationDate: null,date: date});
              }
            });
            return t;
          });
      });
    }

    private loadAllParkings() {
      this.parkingsService.getAll().pipe(first()).subscribe(parkings => {
          this.parkings = parkings;
          this.parkings.sort(this.compareParking);
      });
    }

    private compareParking(parkingA, parkingB) {
      const nameA = parkingA.name.toUpperCase();
      const nameB = parkingB.name.toUpperCase();

      let comparison = 0;
      if (nameA > nameB) {
        comparison = 1;
      } else if (nameA < nameB) {
        comparison = -1;
      }
      return comparison;
    }

    private getDaysInMonth(month,year) {
      return new Date(year, month, 0).getDate();
    };
}
