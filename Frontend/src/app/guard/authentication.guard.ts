import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from "../service/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService, private router: Router) {

  }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isUserLoggedIn(next);
  }

  private isUserLoggedIn(route: ActivatedRouteSnapshot): boolean {
    if(this.authenticationService.isUserLoggedIn())
    {
      console.log("You have access to this route")
      return true;
    }
    this.router.navigate(["/login"]);
    console.log("Do not have access to this route")
    return false;
  }
}
