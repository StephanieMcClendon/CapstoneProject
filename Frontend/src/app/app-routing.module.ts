import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CalculatorComponent} from "./finances/calculator/calculator.component";
import { GoalDetailsComponent } from './goal-details/goal-details.component';

import { GoalListComponent } from './goal-list/goal-list.component';
import { UpdateGoalComponent } from './update-goal/update-goal.component';


const routes: Routes = [
  {path: "calculator", component: CalculatorComponent},
  {path: "goal-details/:id", component: GoalDetailsComponent},
  {path: "goals", component: GoalListComponent},
  {path: "", redirectTo: "calculator", pathMatch: "full"},
  {path: "update-goal/:id", component: UpdateGoalComponent}
  ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
