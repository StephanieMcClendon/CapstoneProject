import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Goal } from '../goal';
import { GoalService } from '../goal.service';

import DatalabelsPlugin from 'chartjs-plugin-datalabels'; // npm installed this
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js'; // npm installed chart.js
import { BaseChartDirective } from 'ng2-charts'; //npm installed ng2-charts

@Component({
  selector: 'app-goal-details',
  templateUrl: './goal-details.component.html',
  styleUrls: ['./goal-details.component.css']
})
export class GoalDetailsComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  id!: number;
  result?: number = 0;
  goal: Goal = new Goal();
  goal_amount?: number = this.goal.goalAmount;
  save_amount?: number = this.goal.saveAmount;
  time_in_months?: number = this.time_in_months;

  chartGoalAmount!: number;
  
  constructor(private goalService: GoalService, 
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.loadGoals(this.id);
    console.log(this.chartGoalAmount)
  }

  public loadGoals(goalId: number)
  {
    this.goalService.getGoalById(goalId).subscribe( data => {
      this.goal = data;
      console.log(this.goal);
      this.chartGoalAmount = this.goal.goalAmount;
      console.log(this.chartGoalAmount)
      this.pieChartData.datasets[0].data[0] = this.chartGoalAmount;
      this.pieChartData.datasets[0].data[1] = this.goal.saveAmount;
      this.chart?.update();

    });

  }

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false

  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    //input variables
    labels: [ [`Goal ${this.goal.id}`]],
    datasets: [ {
      // input variables [current progress, total goal - current progress]
      // how do we keep track of current progress? need value to store in db
      data: []
    } ]
  };
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [ DatalabelsPlugin ];

  updateGoal(id: number){
    this.router.navigate(['goal-details', id]);
  }

  //test method
  displayCalculation(){
    this.result = this.time_in_months! * this.save_amount!;
    return this.result;
  }


}
