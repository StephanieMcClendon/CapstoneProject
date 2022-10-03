import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Income } from '../income';
import { IncomeService } from '../income.service';

@Component({
  selector: 'app-income-list',
  templateUrl: './income-list.component.html',
  styleUrls: ['./income-list.component.css']
})
export class IncomeListComponent implements OnInit {
 incomes?:Income[];
 
  constructor(private incomeService:IncomeService, private router: Router) {

   }

  ngOnInit(): void {
    this.getIncomes();
  }
  private getIncomes(){
    this.incomeService.getIncomeList().subscribe(data => {
      this.incomes = data;
    });
   
  }
  incomeDetails(id: number){
    this.router.navigate(['income-details', id]);
  }

  updateIncome(id: number){
    this.router.navigate(['update-income', id]);
  }

  deleteIncome(id: number){
    this.incomeService.deleteIncome(id).subscribe( data => {
      console.log(data);
      this.getIncomes();
    })
  }
}
