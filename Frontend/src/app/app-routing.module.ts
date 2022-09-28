import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CalculatorComponent} from "./finances/calculator/calculator.component";
import { GoalDetailsComponent } from './goal-details/goal-details.component';

const routes: Routes = [
  {path: "calculator", component: CalculatorComponent},
  {path: 'goal-details/:id', component: GoalDetailsComponent},
  {path: "", redirectTo: "calculator", pathMatch: "full"}
  ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
