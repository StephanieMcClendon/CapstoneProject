import { Component, OnInit } from '@angular/core';
import { Income } from '../income';
import { ActivatedRoute, Router } from '@angular/router';

import { IncomeService } from '../income.service';
import { User } from '../model/user';

@Component({
  selector: 'app-update-income',
  templateUrl: './update-income.component.html',
  styleUrls: ['./update-income.component.css']
})
export class UpdateIncomeComponent implements OnInit {
  user: User= new User();
  income : Income = new Income();
  id! : number;

  constructor(private incomeService: IncomeService, 
    private route: ActivatedRoute, 
    private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.incomeService.getIncomeById(this.id).subscribe(data => {
      this.income = data;
    }, error => console.log(error));
  }

  onSubmit(){
    
    // this.goal.saveAmount = this.saveAmount;
    this.incomeService.updateIncome(this.id, this.income).subscribe( data =>{
      this.goToGoalDetails();
    }
    , error => console.log(error));
  }

  goToGoalDetails(){
    this.router.navigate(['dashboard']);
  }
  

}
