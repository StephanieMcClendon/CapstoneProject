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
import { UpdateIncomeComponent } from './update-income/update-income.component';


const routes: Routes = [
  {path: "calculator", component: CalculatorComponent},
  {path: 'goal-details/:id', component: GoalDetailsComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: "login", component: LoginComponent},
  {path: "logout", component: LogoutComponent, canActivate: [AuthenticationGuard]},
  {path: "update-goal/:id", component: UpdateGoalComponent},
  {path: "", redirectTo: "calculator", pathMatch: "full"},
  {path: "update-expense/:id", component: UpdateExpenseComponent},
  {path: "update-income/:id", component: UpdateIncomeComponent}
  ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
