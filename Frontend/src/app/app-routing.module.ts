import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CalculatorComponent} from "./finances/calculator/calculator.component";
import { GoalDetailsComponent } from './goal-details/goal-details.component';
import { UpdateExpenseComponent } from './update-expense/update-expense.component';
import { GoalListComponent } from './goal-list/goal-list.component';
import {LoginComponent} from "./login/login.component";
import {LogoutComponent} from "./logout/logout.component";
import {AuthenticationGuard} from "./guard/authentication.guard";
import { UpdateGoalComponent } from './update-goal/update-goal.component';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {RegisterComponent} from "./register/register.component";
import {AdminDashboardComponent} from "./admin/admin-dashboard/admin-dashboard.component";



const routes: Routes = [
  {path: "calculator", component: CalculatorComponent},
  {path: 'goal-details/:id', component: GoalDetailsComponent, canActivate: [AuthenticationGuard], data: {role: "ROLE_USER"}},
  {path: 'goals', component: GoalListComponent, canActivate: [AuthenticationGuard], data: {role: "ROLE_USER"}},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthenticationGuard], data: {role: "ROLE_USER"}},
  {path: "login", component: LoginComponent},
  {path: "logout", component: LogoutComponent, canActivate: [AuthenticationGuard]},
  {path: "register", component: RegisterComponent},
  {path: "update-goal/:id", component: UpdateGoalComponent, canActivate: [AuthenticationGuard], data: {role: "ROLE_USER"}},
  {path: "update-expense/:id", component: UpdateExpenseComponent, canActivate: [AuthenticationGuard], data: {role: "ROLE_USER"}},
  {path: "admin/dashboard", component: AdminDashboardComponent,  canActivate: [AuthenticationGuard], data: {role: "ROLE_ADMIN"}},
  {path: "", redirectTo: "calculator", pathMatch: "full"},
  ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
