import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Goal } from '../goal';
import { GoalService } from '../goal.service';

import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CurrDate } from '../currDate';

@Component({
  selector: 'app-goal-details',
  templateUrl: './goal-details.component.html',
  styleUrls: ['./goal-details.component.css']
})
export class GoalDetailsComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;
  id!: number;
  result: number = 0;
  goal: Goal = new Goal();
  goal_id = this.goal.id;
  goal_amount!: number;
  save_amount = this.goal.saveAmount;
  // presentDate = this.goal.presentDate;
  // startDate = this.goal.startDate;
  monthly!: number;
  currDate: Date = new Date();
  cDate: CurrDate = new CurrDate(this.currDate.getMonth(), this.currDate.getDay(), this.currDate.getFullYear());
  
  // getDate() returns number of days into the month
  trackDays = this.currDate.getDate();

  // convert milliseconds to days = (1000 * 24 * 24 * 60)

  constructor(private goalService: GoalService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.goal_amount);
    this.loadGoals(this.id);
  }
  public loadGoals(goalId: number)
  {
    this.goalService.getGoalById(this.id).subscribe( data => {
      this.goal = data;
      console.log(this.goal);
      this.goal_amount = this.goal.goalAmount;
      console.log(this.goal_amount)

      this.pieChartData.datasets[0].data[0] = this.goal.saveAmount;
      this.pieChartData.datasets[0].data[1] = this.goal_amount;
      this.chart?.update();
      this.goal.monthlyPayment = Math.round(this.goal_amount / this.goal.time_in_months);
      // convert into days
      // this.trackDays = Math.floor((this.presentDate - this.startDate) / (1000*60*60*24));
      // this.presentDate = this.currDate.getDate();
      console.log("time in months:" + this.goal.time_in_months);
      // console.log("presentDate: "+this.presentDate);
      console.log("trackDays: " + this.trackDays);
    });
  }

    //Math.floor((current_date - start_date) / (1000*60*60*24))
  
    public pieChartOptions: ChartConfiguration['options'] = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
        datalabels: {
          formatter: (value, ctx) => {
            if (ctx.chart.data.labels) {
              return ctx.chart.data.labels[ctx.dataIndex];
              
            }
          },
        },
      }
    };
    public pieChartData: ChartData<'pie',number[]> = {

      labels:["Current Progress", "Goal Amount"],
      datasets:[{
        data: []
      }]
    };
    public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [ DatalabelsPlugin ];

  updateGoal(id: number){
    this.router.navigate(['update-goal', id]);
    }
  }

  

