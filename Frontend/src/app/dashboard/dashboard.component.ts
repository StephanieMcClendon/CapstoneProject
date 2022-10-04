import { Component, OnInit, ViewChild } from '@angular/core';
import {Goal} from "../goal";
import {GoalService} from "../goal.service";
import {ActivatedRoute, Router} from "@angular/router";
import { MatTabGroup } from '@angular/material/tabs';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('tabs') tabGroup!: MatTabGroup;
  goals?: any[];
  goal: Goal = new Goal();
  incomeCard = false;
  expenseCard = false;
  goalsCard = false;
  searchText: any;

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
    // create button
    this.goalService.createGoal(this.goal).subscribe( data =>{
          console.log(data);
          this.getGoals();
        },
        error => console.log(error)
    );


  }

  goToGoalList(){
    this.router.navigate(['/goals']);
  }

  onSubmitGoal(){
    console.log(this.goal);
    // user_id = user id of current user logged in
    this.tabGroup.selectedIndex = 2;
    this.saveGoal();
  }

  onSubmitIncome() {
    // swipes to income tab
    this.tabGroup.selectedIndex = 0;
  }

  onSubmitExpense() {
    // swipes to expense tab
    this.tabGroup.selectedIndex = 1;
  }

  showForms() {
    this.incomeCard = !this.incomeCard;
    this.expenseCard = !this.expenseCard;
    this.goalsCard = !this.goalsCard;
  }
}
