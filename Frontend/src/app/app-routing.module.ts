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
  {path: 'dashboard', component: DashboardComponent},
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
