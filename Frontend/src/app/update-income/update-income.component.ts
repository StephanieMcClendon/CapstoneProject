import { Component, OnInit } from '@angular/core';
import {IncomeService} from "../income.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Expense} from "../expense";
import {Income} from "../income";

@Component({
  selector: 'app-update-income',
  templateUrl: './update-income.component.html',
  styleUrls: ['./update-income.component.css']
})
export class UpdateIncomeComponent implements OnInit {

  income: Income = new Income();
  id! : number;

  constructor(private incomeService: IncomeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.incomeService.getIncomeById(this.id).subscribe({
      next: value => {
        this.income = value;
      },
      error: err => {
        console.log(err);
      }
    })
  }

  onSubmit() {

    this.incomeService.updateIncome(this.id, this.income).subscribe({
      next: value => {
        this.goToGoalDetails()
      },
      error: err => {
        console.log(err);
      }
    })

  }

  goToGoalDetails(){
    this.router.navigate(['dashboard']);
  }
}
