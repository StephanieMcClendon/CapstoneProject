import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../service/authentication.service";
import {User} from "../model/user";
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit(): void
  {
    if (this.authenticationService.isUserLoggedIn()) {
      this.router.navigateByUrl('/calculator');
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  public onLogin(user: User)
  {
    this.authenticationService.login(user).subscribe({
      next: (response: HttpResponse<User>) => {
        console.log(response);
        if (response.body) {
          this.authenticationService.addUserToLocalCache(response.body);
        }
        this.router.navigateByUrl('/calculator');
      },
      error: err => {
        console.log(err)
      }
    });
  }

}
