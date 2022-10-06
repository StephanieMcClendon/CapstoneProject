import { Component, OnInit } from '@angular/core';
import { Expense } from '../expense';
import { ExpenseService } from '../expense.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {

  expenses?:Expense[];
 
  constructor(private expenseService:ExpenseService, private router: Router) {

   }

  ngOnInit(): void {
    // this.getIncomes();
  }
  // private getIncomes(){
  //   this.expenseService.getExpenseList().subscribe(data => {
  //     this.expenses = data;
  //   });
  // }
  incomeDetails(id: number){
    this.router.navigate(['income-details', id]);
  }

  updateIncome(id: number){
    this.router.navigate(['update-income', id]);
  }

  deleteIncome(id: number){
    this.expenseService.deleteExpense(id).subscribe( data => {
      console.log(data);
      
    })
  }
}

  
