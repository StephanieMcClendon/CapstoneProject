import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from "../service/authentication.service";
import {NotificationService} from "../service/notification.service";
import {NotificationType} from "../enum/notification-type";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService, private router: Router, private notificationService: NotificationService) {

  }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isUserLoggedIn(next);
  }

  private isUserLoggedIn(route: ActivatedRouteSnapshot): boolean {
    if(this.authenticationService.isUserLoggedIn())
    {
      const userRole = this.authenticationService.getRole();
      if (route.data['role'] && route.data['role'].indexOf(userRole) === -1) {
        this.router.navigate(['/login']);
        console.log("You do not have access to this page");
        this.notificationService.notify(NotificationType.WARNING, "you do not have access to this page".toUpperCase());
        return false;
      }
      console.log("You have access to this route")
      return true;
    }
    this.router.navigate(["/login"]);
    console.log("Do not have access to this route")
    return false;
  }
}
