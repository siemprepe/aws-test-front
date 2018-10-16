import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from '../_models';
import { Parking } from '../_models';

import { ParkingsService, AlertService } from '../_services';

@Component({templateUrl: 'parkings.component.html'})
export class ParkingsComponent implements OnInit {
    currentUser: User;
    parkings: Parking[] = [];
    addParkingForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(private formBuilder: FormBuilder,
                private parkingsService: ParkingsService,
                private alertService: AlertService) {
        this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    }

    ngOnInit() {
      this.loadAllParkings();
      this.addParkingForm = this.formBuilder.group({
          id: ['', Validators.required],
          name: ['', Validators.required]
      });
    }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.addParkingForm.invalid) {
            return;
        }

        this.loading = true;
        this.parkingsService.addParking({parkingId:this.f.id.value, name:this.f.name.value})
            .pipe(first())
            .subscribe(
                data => {
                    this.loadAllParkings();
                    this.loading = false;
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    // convenience getter for easy access to form fields
    get f() { return this.addParkingForm.controls; }

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
}
