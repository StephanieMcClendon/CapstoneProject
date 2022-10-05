import { Component, Inject, Injectable, OnInit, ViewChild } from '@angular/core';
import {Goal} from "../goal";
import {GoalService} from "../goal.service";
import {ActivatedRoute, Router} from "@angular/router";
import { MatTabGroup } from '@angular/material/tabs';
import { IncomeService } from '../income.service';
import { Income } from '../income';
import { Expense } from '../expense';
import { ExpenseService } from '../expense.service';
import { DOCUMENT } from '@angular/common';

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

  // Income
  incomes?: any[];
  income: Income = new Income();

  // Expenses
  expenses?: any[];
  expense: Expense = new Expense();

  searchText: any;
  saveAmount: number = this.goal.saveAmount;
  monthlyPayment: number = this.goal.monthlyPayment;
  incomeAmount: number = this.income.amount;
  expenseAmount: number = this.expense.amount;
  remainingAmount: number = 0;
  monthToYear = 0;


  constructor(@Inject (DOCUMENT) private document: Document,
    private goalService: GoalService,
   private expenseService: ExpenseService,
   private incomeService: IncomeService,
   private route: ActivatedRoute,
   private router: Router) { }


  ngOnInit(): void {
    this.getGoals();
    this.getExpenses();
    this.getIncomeList();
    
    console.log("remaining amount: "+this.remainingAmount);
  }

  ngAfterViewInit(): void {
    //default tab
    this.tabGroup.selectedIndex = 2;
  }

  // radio buttons
  // display() { 
  //   var checkRadio = document.querySelector('input[name="flexRadioDefault"]:checked');
      
  //   if(checkRadio != null) {
  //       console.log((<HTMLInputElement>checkRadio).value);
  //       (<HTMLInputElement>document.getElementById("disp")).innerHTML = (<HTMLInputElement>checkRadio).value + " radio button checked";
  //   }
  //   else {
  //       console.log("Nothing selected");
  //       (<HTMLInputElement>document.getElementById("disp")).innerHTML = "No one selected";
  //   }
  // }


  /* ***************  GOAL Methods  ****************************** */


  private getGoals(){
    this.goalService.getGoalsList().subscribe(data => {
      this.goals = data;
      console.log(this.goals);
      for(let i = 0; i < this.goals!.length; i++){
        console.log(this.goals![i].saveAmount)
        if(this.goals![i].monthlyPayment === 0){
          // call congratulations();
        }
      }
    });
  }

  congratulations(){
    // insert logic for pop up confetti
  }

  goToGoalDetails(id: number){
    this.router.navigate(['goal-details', id]);
  }

  updateGoal(id: number){
    this.router.navigate(['update-goal', id]);
  }

  deleteGoal(id: number){
    this.goalService.deleteGoal(id).subscribe( data => {
      console.log(data);
      this.goToGoalList();
      this.getGoals();
    })
  }

  saveGoal(){
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
    console.log("remaining: "+ this.remainingAmount);
    console.log("monthly: "+this.monthlyPayment);
    this.goal.monthlyPayment = this.monthlyPayment;
    this.tabGroup.selectedIndex = 2;
    this.saveGoal();
  }


  /* *************** INCOME Methods ****************************** */

  private getIncome(){
    this.incomeService.getIncomeList().subscribe(data => {
      this.incomes = data;
      console.log(this.incomes);
    });
  }

  private getIncomeList(){
    this.incomeService.getIncomeList().subscribe(data => {
      this.incomes = data;
      console.log(this.incomes);
    });
  }

  updateIncome(id: number){
    this.router.navigate(['update-income', id]);
  }

  deleteIncome(id: number){
    this.incomeService.deleteIncome(id).subscribe( data => {
      console.log(data);
      this.getIncomeList();
    })
  }

  saveIncome(){
    this.incomeService.createIncome(this.income).subscribe( data =>{
          console.log(data);
          this.getIncome();
        },
        error => console.log(error));
  }

  onSubmitIncome() {
    // swipes to income tab
    this.tabGroup.selectedIndex = 0;
    this.saveIncome();
  }


  /* *************** EXPENSE Methods ****************************** */


  private getExpenses(){
    this.expenseService.getExpenseList().subscribe(data => {
      this.expenses = data;
      console.log(this.expenses);
    });
  }

  updateExpense(id: number){
    this.router.navigate(['update-expense', id]);
  }

  deleteExpense(id: number){
    this.expenseService.deleteExpense(id).subscribe( data => {
      console.log(data);
      this.getExpenses();
    })
  }

  saveExpense(){
    this.expenseService.createExpense(this.expense).subscribe( data =>{
          console.log(data);
        this.getExpenses();
        },
        error => console.log(error));
  }

  onSubmitExpense() {
    // swipes to expense tab
    this.tabGroup.selectedIndex = 1;
    this.monthToYear = this.expense.amount * 12;
    console.log("month to year: "+this.monthToYear);
    this.expense.total = this.monthToYear;
    this.saveExpense();
  }

  displayIncomeMinusExpense(){
    this.remainingAmount = this.incomeAmount - this.expenseAmount;
    var label = document.querySelector("remainingAmount");
    var incomeAmount = document.getElementById("incomeAmount");
    var expenseAmount = document.getElementById("amount");
      
    console.log((<HTMLInputElement>label).value);
    (<HTMLInputElement>document.getElementById("remainingAmount")).innerHTML = `${this.remainingAmount}`;

  }
}
