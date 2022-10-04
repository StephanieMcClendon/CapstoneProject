import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Goal } from '../goal';
import { GoalService } from '../goal.service';
import { MatTabGroup } from '@angular/material/tabs';
import {DashboardComponent} from "../dashboard/dashboard.component";


@Component({
  selector: 'app-update-goal',
  templateUrl: './update-goal.component.html',
  styleUrls: ['./update-goal.component.css']
})
export class UpdateGoalComponent implements OnInit {
  @ViewChild('tabs') tabGroup!: MatTabGroup;

  id!: number;
  goal: Goal = new Goal();
  monthlyPayment: number = this.goal.monthlyPayment;
  saveAmount!: number;

  constructor(private goalService: GoalService, 
    private route: ActivatedRoute, 
    private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.goalService.getGoalById(this.id).subscribe(data => {
      this.goal = data;
    }, error => console.log(error));
  }

  onSubmit(){
    
    this.monthlyPayment = (this.goal.goalAmount - this.goal.saveAmount) / this.goal.time_in_months;
    this.goal.monthlyPayment = this.monthlyPayment;
    // this.goal.saveAmount = this.saveAmount;
    this.goalService.updateGoal(this.id, this.goal).subscribe( data =>{
      this.goToGoalDetails();
    }
    , error => console.log(error));
  }

  goToGoalDetails(){
    this.router.navigate(['dashboard']);
  }
  
}
