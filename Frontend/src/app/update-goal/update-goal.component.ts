import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Goal } from '../goal';
import { GoalService } from '../goal.service';

import { MatTabGroup } from '@angular/material/tabs';
import {DashboardComponent} from "../dashboard/dashboard.component";
import { Location } from '@angular/common'


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
  num: number = 1;

  constructor(private goalService: GoalService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.goalService.getGoalById(this.id).subscribe(data => {
      this.goal = data;
    }, error => console.log(error));
  }

  previousPage(): void {
    // implement relative routing importing/injecting Location and using .back()
    this.location.back()
  }

  onSubmit(){
    this.monthlyPayment = (this.goal.goalAmount - this.goal.saveAmount) / this.goal.time_in_months;
    this.goal.monthlyPayment = this.monthlyPayment;
    this.goalService.updateGoal(this.id, this.goal).subscribe( data =>{
      this.goToGoalDetails();
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate(['/update-user']);
        this.tabGroup.selectedIndex = 2;
    });
    }
    , error => console.log(error));
  }

  goToGoalDetails(){
    this.previousPage();
  }
  
}
