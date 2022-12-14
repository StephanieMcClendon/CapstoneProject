import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { Expense } from 'src/app/expense';
import { ExpenseService } from 'src/app/expense.service';
import { Goal } from 'src/app/goal';
import { GoalService } from 'src/app/goal.service';
import { Income } from 'src/app/income';
import { IncomeService } from 'src/app/income.service';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  @ViewChild('tabs') tabGroup!: MatTabGroup;

  // Goals
  goals?: Goal[];
  goal: Goal = new Goal();
  incomeCard = false;
  expenseCard = false;
  goalsCard = false;
  searchText: any;
  saveAmount: number = this.goal.saveAmount;
  monthlyPayment: number = this.goal.monthlyPayment;
  // Income
  incomes?: any[];
  income: Income = new Income();
  // Expenses
  expenses?: any[];
  expense: Expense = new Expense();
  incomeAmount: number = this.income.amount;
  expenseAmount: number = this.expense.amount;
  remainingAmount: number = 0;
  monthToYear: number = 0;
  totalIncome!: number;
  totalExpense!: number;
  id: number = JSON.parse(localStorage.getItem("id")!);
  // User
  users?: any[];
  user: User = new User();
  
  constructor(private goalService: GoalService,
    private expenseService: ExpenseService,
    private incomeService: IncomeService,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.getGoals();
    console.log(this.goals)
    this.getExpenses();
    this.getIncome();
    this.getUsers();
    console.log("remaining amount: "+this.remainingAmount);
  }

  /* ***************  GOAL Methods  ****************************** */

  private getGoals(){
    this.goalService.getGoalsList(this.id).subscribe(data => {
      this.goals = data;
      console.log(this.goals);
      for(let i = 0; i < this.goals!.length; i++){
        console.log(this.goals![i].saveAmount)
        if(this.goals![i].monthlyPayment === 0){ // or if(this.goals![i].saveAmount == this.goals![i].goalAmount)
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
      this.getGoals();
    })
  }

  saveGoal(){
    this.goalService.createGoal(this.goal, this.id).subscribe( data =>{
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
    this.monthlyPayment = (this.goal.goalAmount - this.goal.saveAmount) / this.goal.time_in_months;
    console.log("remaining: "+ this.remainingAmount);
    console.log("monthly: "+this.monthlyPayment);
    this.goal.monthlyPayment = this.monthlyPayment;
    this.tabGroup.selectedIndex = 2;
    this.saveGoal();
  }


  /* *************** INCOME Methods ****************************** */

  private getIncome(){
    this.incomeService.getIncomeList(this.id).subscribe(data => {
      this.incomes = data;
      console.log(this.incomes);
      this.totalIncome = 0;
      for(let i = 0; i < this.incomes.length; i++){
        this.totalIncome += this.incomes[i].amount;
      }
      console.log("" + this.totalIncome);
    });
  }

  // private getIncomeList(){
  //   this.incomeService.getIncomeList().subscribe(data => {
  //     this.incomes = data;
      
  //     console.log(this.incomes);
  //   });
  // }

  private getIncomeList(){
    this.incomeService.getIncomeList(this.id).subscribe(data => {
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
      this.getIncome();
    })
  }

  saveIncome(){
    this.incomeService.createIncome(this.income, this.id).subscribe( data =>{
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
    this.expenseService.getExpenseList(this.id).subscribe(data => {
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
    this.expenseService.createExpense(this.expense, this.id).subscribe( data =>{
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

  showForms() {
    this.incomeCard = !this.incomeCard;
    this.expenseCard = !this.expenseCard;
    this.goalsCard = !this.goalsCard;
  }


  displayIncomeMinusExpense(){
    this.remainingAmount = this.incomeAmount - this.expenseAmount;
    var label = document.querySelector("remainingAmount");
    var incomeAmount = document.getElementById("incomeAmount");
    var expenseAmount = document.getElementById("amount");
      
    console.log((<HTMLInputElement>label).value);
    (<HTMLInputElement>document.getElementById("remainingAmount")).innerHTML = `${this.remainingAmount}`;

  }

  /* *************** USER Methods ****************************** */


  getUsers(){
    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
      console.log(this.users);
    });
  }

  updateUser(id: number){
    this.router.navigate(['update-user', id]);
  }

  deleteUser(id: number){
    this.userService.deleteUser(id).subscribe( data => {
      console.log(data);
      this.getUsers();
    })
  }

  ifNotAdmin(role: any){
    if(role == "ROLE_ADMIN"){
      return false;
    }
    else{
      return true;
    }
  }

  goToUserDetails(id: number){
    this.router.navigate(['user-details', id]);
  }

  saveUser(){
    this.userService.createUser(this.user, this.id).subscribe( data =>{
          console.log(data);
        this.getUsers();
        },
        error => console.log(error));
  }

  onSubmitUser() {
    // swipes to expense tab
    this.tabGroup.selectedIndex = 3;
    this.saveUser();
  }
  

}
