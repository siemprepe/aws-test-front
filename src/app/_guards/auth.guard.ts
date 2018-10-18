import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../_services';
import { RouteValues } from '../_helpers';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
                private authenticationService: AuthenticationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authenticationService.isAuthenticated()) {
            return true;
        }
        this.router.navigate([RouteValues.LOGIN.path], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
