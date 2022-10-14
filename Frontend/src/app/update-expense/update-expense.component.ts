import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Expense } from '../expense';
import { ExpenseService } from '../expense.service';
import { MatTabGroup } from '@angular/material/tabs';
import {DashboardComponent} from "../dashboard/dashboard.component";
import { AuthenticationService } from '../service/authentication.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-update-expense',
  templateUrl: './update-expense.component.html',
  styleUrls: ['./update-expense.component.css']
})
export class UpdateExpenseComponent implements OnInit {

  expense : Expense = new Expense();
  id! : number;

  constructor(private expenseService: ExpenseService, 
    private authenticationService: AuthenticationService,
    private location: Location,
    private route: ActivatedRoute, 
    private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.expenseService.getExpenseById(this.id).subscribe(data => {
      this.expense = data;
    }, error => console.log(error));
  }
  previousPage(): void {
    // implement relative routing importing/injecting Location and using .back()
    this.location.back()
  }

  onSubmit(){
    
    // this.goal.saveAmount = this.saveAmount;
    this.expenseService.updateExpense(this.id, this.expense).subscribe( data =>{
      this.goToUserDetails();
      this.previousPage();
    }
    , error => console.log(error));
  }

  goToUserDetails(){
    if(this.authenticationService.getRole() =="ROLE_ADMIN"){
      this.router.navigate(['/admin/dashboard']);
    }
    else{
      this.router.navigate(['dashboard']);
    }
  }
  

}
