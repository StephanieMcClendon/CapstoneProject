import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CalculatorComponent} from "./finances/calculator/calculator.component";
import { GoalDetailsComponent } from './goal-details/goal-details.component';

import { GoalListComponent } from './goal-list/goal-list.component';
import {LoginComponent} from "./login/login.component";
import {LogoutComponent} from "./logout/logout.component";
import {AuthenticationGuard} from "./guard/authentication.guard";
import { UpdateGoalComponent } from './update-goal/update-goal.component';
import {DashboardComponent} from "./dashboard/dashboard.component";



const routes: Routes = [
  {path: "calculator", component: CalculatorComponent},
  {path: 'goal-details/:id', component: GoalDetailsComponent},
<<<<<<< HEAD
  {path: 'goals', component: GoalListComponent}, 
=======
  {path: 'dashboard', component: DashboardComponent},
>>>>>>> b0a2f11530bb194274673dafe6b9fa35428b2d45
  {path: "login", component: LoginComponent},
  {path: "logout", component: LogoutComponent, canActivate: [AuthenticationGuard]},
  {path: "update-goal/:id", component: UpdateGoalComponent},
  {path: "", redirectTo: "calculator", pathMatch: "full"}
  ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
