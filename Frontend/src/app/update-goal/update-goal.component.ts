import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Goal } from '../goal';
import { GoalService } from '../goal.service';

@Component({
  selector: 'app-update-goal',
  templateUrl: './update-goal.component.html',
  styleUrls: ['./update-goal.component.css']
})
export class UpdateGoalComponent implements OnInit {

  id!: number;
  goal: Goal = new Goal();
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
    this.goalService.updateGoal(this.id, this.goal).subscribe( data =>{
      this.goToGoalDetails(this.id);
    }
    , error => console.log(error));
  }

  goToGoalDetails(id: number){
    this.router.navigate(['goal-details', id]);
  }
  
}
