import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Goal } from '../goal';
import { GoalService } from '../goal.service';
import { Expense } from '../expense';
import { Income } from '../income';

import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { IncomeService } from '../income.service';
import { ExpenseService } from '../expense.service';
import Swal from 'sweetalert2';
import { Size } from 'tsparticles-engine';
import { NonNullableFormBuilder } from '@angular/forms';

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
  income: Income = new Income();
  expense: Expense = new Expense();
  goal_id = this.goal.id;
  goal_amount!: number;
  save_amount = this.goal.saveAmount;
  monthly!: number;
  currentProgress: string = "";
  goalTotal: string = "";
  progress: string = "";
  val1!: number;
  val2!: number;
  math = Math;

  // expense
  remainingAmount!: number;
  
  constructor(private goalService: GoalService,
    private incomeService: IncomeService,
    private expenseService: ExpenseService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.goal_amount);
    this.loadGoals(this.id);
    this.remainingAmount = this.income.amount - this.expense.amount;
  }

  ngAfterViewInit(): void {
    
  }

  public loadGoals(goalId: number)
  {
    this.goalService.getGoalById(this.id).subscribe( data => {
      this.goal = data;
      this.goal_amount = this.goal.goalAmount - this.goal.saveAmount;
      this.progress = "" + (((this.goal.saveAmount / this.goal.goalAmount) * 100)).toFixed(2);
      this.currentProgress = "" + ((this.goal.saveAmount / this.goal.goalAmount) * 100) + "%"
      this.goalTotal = "" + (this.goal_amount / this.goal.goalAmount) * 100 + "%"
      // this.goal.monthlyPayment = (this.goal.time_in_months - (this.goal.time_in_months * (this.goal.saveAmount / this.goal.goalAmount)));
      
      this.pieChartData.datasets[0].data[1] = parseFloat((((this.goal.saveAmount / this.goal.goalAmount) * 100)).toFixed(2));
      this.pieChartData.datasets[0].data[0] = parseFloat(((this.goal_amount / this.goal.goalAmount) * 100).toFixed(2));
      this.chart?.update();
      this.goal.monthlyPayment = Math.round(this.goal_amount / this.goal.time_in_months);
      if(this.goal.saveAmount >= this.goal.goalAmount){
        console.log("CONGRATS!");
        this.congratulations();
      }
    });
  }

    //Math.floor((current_date - start_date) / (1000*60*60*24))
    
    public pieChartOptions: ChartConfiguration['options'] = {
      responsive: true,
      maintainAspectRatio: false,
  
      plugins: {
        title: {
          display: true,
          // text: "Goal Current Progress"
      },
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
      
      labels:[`Goal Remaining ${this.goalTotal}%`, `Current Progress in ${this.currentProgress}%`], 
      datasets:[{
        data: []
      }]
    };
    public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [ DatalabelsPlugin ];

  updateGoal(id: number){
    this.router.navigate(['update-goal', id]);
    }

    congratulations(){
  
      Swal.fire({
        title: 'Congratulations! You reached your goal!',
        width: 500,
        padding: '3em',
        color: '#000000',
        background: '#fff',
        backdrop: `
          rgba(255, 218, 72,0.4)
          url("./assets/confetti-44.webp")
          center top
          no-repeat
        `
    });
  }
  }

  

