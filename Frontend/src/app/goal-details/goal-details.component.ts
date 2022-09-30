import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Goal } from '../goal';
import { GoalService } from '../goal.service';

@Component({
  selector: 'app-goal-details',
  templateUrl: './goal-details.component.html',
  styleUrls: ['./goal-details.component.css']
})
export class GoalDetailsComponent implements OnInit {

  id!: number;
  goalAmount?: number;
  saveAmount?: number;
  time_in_months?: number;
  goal: Goal = new Goal();
  constructor(private goalService: GoalService, 
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.goal = new Goal();
    this.goalService.getGoalById(this.id).subscribe( data => {
      this.goal = data;
    });
  }

  updateGoal(id: number){
    this.router.navigate(['goal-details', id]);
  }

}
