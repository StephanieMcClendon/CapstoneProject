import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../service/authentication.service";
import {User} from "../model/user";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {NotificationService} from "../service/notification.service";
import {NotificationType} from "../enum/notification-type";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, 
    private authenticationService: AuthenticationService, 
    private notificationService: NotificationService) { }

  role: string | null = this.authenticationService.getRole();
  current_role: string | null = localStorage.getItem("role");
  loggedIn: boolean = false;
  user: string | null = localStorage.getItem("user");
  name!: string | undefined;

  ngOnInit(): void
  {
    
    if (this.authenticationService.isUserLoggedIn()) {
      this.router.navigate(['/calculator'])
    }
  else {
      this.router.navigateByUrl('/login');
    }
  }
  ngAfterViewInit(user: User): void
  {

    if(this.authenticationService.getRole() == "ROLE_ADMIN"){
      localStorage.setItem("role", JSON.stringify("ROLE_ADMIN"));
    }
    else{
      localStorage.setItem("role", JSON.stringify("ROLE_USER"));
    }
  }

  successNotification() {
    Swal.fire('Login Success!', `Welcome, ${this.name}!`, 'success');
  }

  public onLogin(user: User)
  {
    this.authenticationService.login(user).subscribe({
      next: (response: HttpResponse<User>) => {
        console.log(response);
        if (response.body) {
          this.authenticationService.addUserToLocalCache(response.body);
        }
        this.name = response.body?.firstName;
        this.successNotification();
        this.router.navigateByUrl('/calculator');
        
      },
      error: (errorResponse: HttpErrorResponse) =>
      {
        this.sendErrorNotification(NotificationType.ERROR, errorResponse.error.message);
      }
    });
  }

  private sendErrorNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.notify(notificationType, "Invalid Username or Password. Please try again.");
    } else {
      this.notificationService.notify(notificationType, 'An error occurred. Please try again.');
    }
  }

}
