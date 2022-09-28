import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoalDetailsComponent } from './goal-details/goal-details.component';


const routes: Routes = [
  {path: 'goal-details/:id', component: GoalDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
