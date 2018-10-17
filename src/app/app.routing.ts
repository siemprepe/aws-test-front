import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { ParkingsComponent } from './parkings';
import { ReservationsComponent } from './reservations';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard, RoleGuard } from './_guards';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'parkings', component: ParkingsComponent, canActivate: [RoleGuard], data: { expectedRole: 'ADMIN' } },
    { path: 'reservations', component: ReservationsComponent, canActivate: [RoleGuard], data: { expectedRole: 'ADMIN' } },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
