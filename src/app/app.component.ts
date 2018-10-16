import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './_services';

@Component({
    selector: 'app',
    templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit{

  constructor(private authenticationService: AuthenticationService){}

  ngOnInit() {
    console.log("App Init");
    (JSON.parse(sessionStorage.getItem('currentUser')) !== null) ? this.authenticationService.triggerLoggedIn() : false;
  }

}
