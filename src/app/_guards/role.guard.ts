import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from '../_services';
import { RouteValues } from '../_helpers';

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService,
              private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;

    if ( !this.authenticationService.isAuthenticated() || !this.authenticationService.hasRole(expectedRole)) {
      this.router.navigate([RouteValues.LOGIN.path]);
      return false;
    }
    return true;
  }


}
