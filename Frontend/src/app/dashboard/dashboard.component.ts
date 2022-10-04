import { Component, OnInit, ViewChild } from '@angular/core';
import {Goal} from "../goal";
import {GoalService} from "../goal.service";
import {ActivatedRoute, Router} from "@angular/router";
import { MatTabGroup } from '@angular/material/tabs';
import { IncomeService } from '../income.service';
import { Income } from '../income';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  @ViewChild('tabs') tabGroup!: MatTabGroup;

  // Goals
  goals?: any[];
  goal: Goal = new Goal();
  searchText: any;
  // presentDate = this.goal.presentDate;
  // startDate = this.goal.startDate;
  saveAmount: number = this.goal.saveAmount;
  monthlyPayment: number = this.goal.monthlyPayment;
  // startBalance: number;

  // Income
  incomes?: any[];
  income: Income = new Income();

  // Expenses

  constructor(private goalService: GoalService,
   private incomeService: IncomeService,
   private route: ActivatedRoute,
   private router: Router) { }

  ngOnInit(): void {
    // @JsonIgnore in spring boot to avoid over populating db
    // OR update application.properties to update db instead of create
    this.getGoals();
    console.log(this.goals)
  }

  // ** GOAL Methods **
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
        error => console.log(error));
  }

  goToGoalList(){
    this.router.navigate(['/goals']);
  }

  onSubmitGoal(){
    console.log(this.goal);
    // user_id = user id of current user logged in
    
    this.monthlyPayment = (this.goal.goalAmount - this.goal.saveAmount) / this.goal.time_in_months;
    console.log(this.monthlyPayment);
    this.goal.monthlyPayment = this.monthlyPayment;
    this.tabGroup.selectedIndex = 2;
    this.saveGoal();
  }

  // ** INCOME Methods **

  // private getIncomes(){
  //   this.goalService.getIncomeList().subscribe(data => {
  //     this.incomes = data;
  //     console.log(this.incomes);
  //   });
  // }

  // no need for income details page

  updateIncome(id: number){
    this.router.navigate(['update-goal', id]);
  }

  deleteIncome(id: number){
    // routed to delete button
    this.goalService.deleteGoal(id).subscribe( data => {
      console.log(data);
      this.goToGoalList();
      this.getGoals();
    })
  }

  saveIncome(){
    // create button
    this.goalService.createGoal(this.goal).subscribe( data =>{
          console.log(data);
          this.getGoals();
        },
        error => console.log(error));
  }

  // no goal list needed, switch to tab instead

  onSubmitIncome() {
    // swipes to income tab
    this.tabGroup.selectedIndex = 0;
    this.saveIncome();
  }



  // ** EXPENSE Methods **

  // private getExpenses(){
  //   this.expenseService.getExpenseList().subscribe(data => {
  //     this.expenses = data;
  //     console.log(this.expenses);
  //   });
  // }

  // no need for income details page

  updateExpense(id: number){
    this.router.navigate(['update-goal', id]);
  }

  deleteExpense(id: number){
    // routed to delete button
    this.goalService.deleteGoal(id).subscribe( data => {
      console.log(data);
      this.goToGoalList();
      this.getGoals();
    })
  }

  saveExpense(){
    // create button
    this.goalService.createGoal(this.goal).subscribe( data =>{
          console.log(data);
          this.getGoals();
        },
        error => console.log(error));
  }

  onSubmitExpense() {
    // swipes to expense tab
    this.tabGroup.selectedIndex = 1;
  }
}
