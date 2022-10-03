import { Component, OnInit } from '@angular/core';
import { Goal } from 'src/app/goal';
import { GoalService } from '../goal.service'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-goal-list',
  templateUrl: './goal-list.component.html',
  styleUrls: ['./goal-list.component.css']
})
export class GoalListComponent implements OnInit {

  goals?: any[];
  goal: Goal = new Goal();
  searchText: any;

  constructor(private goalService: GoalService,
    private route: ActivatedRoute,
    private router: Router) { }
  
  ngOnInit(): void {
    // @JsonIgnore in spring boot to avoid over populating db
    // OR update application.properties to update db instead of create
    this.getGoals();
  }

  private getGoals(){
    this.goalService.getGoalsList().subscribe(data => {
      this.goals = data;
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
    error => console.log(error));
  }

  goToGoalList(){
    this.router.navigate(['/goals']);
  }

  onSubmit(){
    console.log(this.goal);
    // user_id = user id of current user logged in
    this.saveGoal();
  }
}
