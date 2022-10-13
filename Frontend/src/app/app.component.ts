import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Goal } from './goal';
import { GoalService } from './goal.service';
import {AuthenticationService} from "./service/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isLoggedIn: boolean = this.authenticationService.isUserLoggedIn();
  role: string | null = this.authenticationService.getRole();
  count!: number;

  constructor(private authenticationService: AuthenticationService,
    private router: Router)
  {

  }

  ngAfterViewInit(): void{
    // this.route.reload();
  }

  public loggedIn(): boolean
  {
    if (this.authenticationService.isUserLoggedIn())
    {
      // console.log("this role: "+this.role);
      return true;
    }
    else{
      return false;
    }
  }

  public ifAdmin()
  {
    if(this.authenticationService.getRole() == "ROLE_ADMIN"){
      return true;
    }
    else{
      return false;
    }
  }

  public ifUser()
  {
    if(this.authenticationService.getRole() == "ROLE_USER"){
      return true;
    }
    else{
      return false;
    }
  }

  title = 'expense';
}
