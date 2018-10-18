import { Routes, RouterModule } from '@angular/router';
import { RouteValues, Roles } from './_helpers';
import { HomeComponent } from './home';
import { ParkingsComponent } from './parkings';
import { ReservationsComponent } from './reservations';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard, RoleGuard } from './_guards';

const appRoutes: Routes = [
    { path: RouteValues.HOME.name, component: HomeComponent, canActivate: [AuthGuard] },
    { path: RouteValues.PARKINGS.name, component: ParkingsComponent, canActivate: [RoleGuard], data: { expectedRole: Roles.ADMIN.value } },
    { path: RouteValues.RESERVATIONS.name, component: ReservationsComponent, canActivate: [RoleGuard], data: { expectedRole: Roles.ADMIN.value } },
    { path: RouteValues.LOGIN.name, component: LoginComponent },
    { path: RouteValues.REGISTER.name, component: RegisterComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
