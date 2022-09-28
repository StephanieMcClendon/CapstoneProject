import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  savingsGoal: number = 0;
  startingBalance: number = 0;
  years: number = 0;
  months: number = 0;
  monthlyPayment: number = 0.00;


  constructor() { }

  ngOnInit(): void
  {

  }


  onSubmit() {
    console.log("This button is clicked");
    console.log(this.startingBalance);
    console.log(this.savingsGoal);
    console.log(this.years);
    console.log(this.months);
    this.monthlyPayment = (this.savingsGoal - this.startingBalance) / ((this.months) + (this.years * 12));
    console.log(this.monthlyPayment);
  }

}
