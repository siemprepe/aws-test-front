import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit{

  ngOnInit() {
      console.log("test")
  }

  isLoggedIn(){
    //return (JSON.parse(sessionStorage.getItem('currentUser')) !== null) ? true : false;
    return true;
  }
}
