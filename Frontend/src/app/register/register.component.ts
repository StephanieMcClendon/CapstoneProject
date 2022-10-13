import { Component, OnInit } from '@angular/core';
import {User} from "../model/user";
import {AuthenticationService} from "../service/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = new User();
  pattern = "/^(?=.*\\d).{8,}$/";

  constructor(private authenticationService: AuthenticationService, 
    private router: Router) { }

  ngOnInit(): void
  {


  }

  onSubmit(user: any)
  {
    this.authenticationService.register(user).subscribe({
      next: value => {
        console.log(value);
        this.router.navigate(["/login"]);
      },
      error: err => {
        console.log(err);
      }
    });
  }

  checkPassword()
  {




  }
}
