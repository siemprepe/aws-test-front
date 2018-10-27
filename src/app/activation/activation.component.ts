import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { AlertService, UserService } from '../_services';

@Component({templateUrl: 'activation.component.html'})
export class ActivationComponent implements OnInit {
  complete: boolean = false;
  error: boolean = false;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private userService: UserService,
        private alertService: AlertService) {
          this.route.params.subscribe( params => {
            this.checkToken(params.token);
          });
        }

    ngOnInit() {}

    checkToken(token: string){
      this.userService.activate(token)
          .pipe(first())
          .subscribe(
              data => {
                  this.alertService.success('Activation successful', false);
                  this.complete = true;
                  this.error = false;
              },
              error => {
                  this.alertService.error(error);
                  this.complete = false;
                  this.error = true;
              });
    }
}
