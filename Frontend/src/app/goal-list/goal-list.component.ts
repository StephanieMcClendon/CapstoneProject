import { Component, OnInit } from '@angular/core';
import { Goal } from 'src/app/goal';
import { GoalService } from '../goal.service'
import { ActivatedRoute, Router } from '@angular/router';
import { getLocaleDateFormat } from '@angular/common';
import {formatDate} from '@angular/common';
import { CurrDate } from 'src/app/currDate';

@Component({
  selector: 'app-goal-list',
  templateUrl: './goal-list.component.html',
  styleUrls: ['./goal-list.component.css']
})
export class GoalListComponent implements OnInit {

  goals?: any[];
  goal: Goal = new Goal();
  searchText: any;
  presentDate = this.goal.presentDate;
  startDate = this.goal.startDate;
  trackDays!: number;
  currDate = new Date();
  dt!: String;
  cDate: CurrDate = new CurrDate(this.currDate.getMonth(), this.currDate.getDay(), this.currDate.getFullYear());

  constructor(private goalService: GoalService,
    private route: ActivatedRoute,
    private router: Router) { }
  
  ngOnInit(): void {
    // @JsonIgnore in spring boot to avoid over populating db
    // OR update application.properties to update db instead of create
    this.getGoals();
    console.log(this.goals)
  }

  private getGoals(){
    this.goalService.getGoalsList().subscribe(data => {
      this.goals = data;
      this.goal.time_in_months = Math.round(this.goal.goalAmount / 30);
      this.trackDays = Math.floor((this.presentDate.getTime() - this.startDate.getTime()) / (1000*60*60*24));
      this.presentDate = this.cDate;
      this.dt = this.cDate.returnDate();
      console.log(this.goals);
    });
  }

  goToGoalDetails(id: number){
    this.router.navigate(['goal-details', id]);
  }

  updateGoal(id: number){
    this.router.navigate(['update-goal', id]);
  }

  deleteGoal(id: number){
    // routed to delete button
    this.goalService.deleteGoal(id).subscribe( data => {
      console.log(data);
      this.goToGoalList();
      this.getGoals();
    })
  }

  saveGoal(){
    this.presentDate = this.cDate;
    this.dt = this.cDate.returnDate();
    this.goalService.createGoal(this.goal).subscribe( data =>{
      console.log(data);
      
      this.getGoals();
    },
    error => console.log(error));
  }

  goToGoalList(){
    this.router.navigate(['/dashboard']);
  }

  onSubmit(){
    // user_id = user id of current user logged in
    
    this.saveGoal();
  }
}
