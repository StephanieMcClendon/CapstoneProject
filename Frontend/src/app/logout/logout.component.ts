import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthenticationService} from "../service/authentication.service";
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,
    private router: Router,
    private notificationService: NotificationService) { }

  ngOnInit(): void
  {
    this.authenticationService.logout();
    if (this.authenticationService.isUserLoggedIn()) {
      this.router.navigateByUrl('/calculator');
    } else {
      // re-route to logout page
      this.router.navigateByUrl('/logout');
    }
  }

}
