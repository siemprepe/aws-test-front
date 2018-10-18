import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AlertComponent } from './_directives';
import { AuthGuard, RoleGuard } from './_guards';
import { JwtInterceptor, ErrorInterceptor, ReservationByParkingPipe, ReservationByDatePipe } from './_helpers';
import { AlertService, AuthenticationService, UserService, ParkingsService, ReservationService } from './_services';
import { HomeComponent } from './home';
import { ParkingsComponent } from './parkings';
import { ReservationsComponent } from './reservations';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { ActivationComponent } from './activation';
import { MenuComponent } from './menu';
import { ReservationConfirmModalComponent } from './reservation-confirm-modal';
import { ReservationDeleteModalComponent } from './reservation-delete-modal';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        routing,
        NgbModule,
        FormsModule
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        ActivationComponent,
        ParkingsComponent,
        ReservationsComponent,
        MenuComponent,
        ReservationConfirmModalComponent,
        ReservationDeleteModalComponent,
        ReservationByParkingPipe,
        ReservationByDatePipe
    ],
    entryComponents: [
      ReservationConfirmModalComponent,
      ReservationDeleteModalComponent
    ],
    providers: [
        AuthGuard,
        RoleGuard,
        AlertService,
        AuthenticationService,
        UserService,
        ParkingsService,
        ReservationService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
