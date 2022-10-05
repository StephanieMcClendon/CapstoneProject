import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Expense } from '../expense';
import { ExpenseService } from '../expense.service';
import { MatTabGroup } from '@angular/material/tabs';
import {DashboardComponent} from "../dashboard/dashboard.component";

@Component({
  selector: 'app-update-expense',
  templateUrl: './update-expense.component.html',
  styleUrls: ['./update-expense.component.css']
})
export class UpdateExpenseComponent implements OnInit {

  expense : Expense = new Expense();
  id! : number;

  constructor(private expenseService: ExpenseService, 
    private route: ActivatedRoute, 
    private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.expenseService.getExpenseById(this.id).subscribe(data => {
      this.expense = data;
    }, error => console.log(error));
  }

  onSubmit(){
    
    // this.goal.saveAmount = this.saveAmount;
    this.expenseService.updateExpense(this.id, this.expense).subscribe( data =>{
      this.goToGoalDetails();
    }
    , error => console.log(error));
  }

  goToGoalDetails(){
    this.router.navigate(['dashboard']);
  }
  

}
