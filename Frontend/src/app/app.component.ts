import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private authenticationService: AuthenticationService)
  {

  }


  
  title = 'expense';
}
