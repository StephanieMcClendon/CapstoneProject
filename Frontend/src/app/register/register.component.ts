import { Component, OnInit } from '@angular/core';
import {User} from "../model/user";
import {AuthenticationService} from "../service/authentication.service";
import {Router} from "@angular/router";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = new User();
  userObject: string | null = localStorage.getItem("user");
  name!: string | undefined;

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
        this.registerSuccessNotification();
      },
      error: err => {
        console.log(err);
      }
      
    });
    
  }

  registerSuccessNotification() {
    Swal.fire({
      title: `Welcome to the club, ${this.user.firstName}`,
      width: 600,
      padding: '3em',
      color: '#F9CA38',
      background: '#fff',
      backdrop: `
      url("./assets/Success-1.gif")
        center top
        no-repeat
      `
    });

  }
  
}
