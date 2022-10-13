import { Component, OnInit, ViewChild } from '@angular/core';
import {IncomeService} from "../income.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Expense} from "../expense";
import {Income} from "../income";
import { AuthenticationService } from '../service/authentication.service';
import { Location } from '@angular/common'
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-update-income',
  templateUrl: './update-income.component.html',
  styleUrls: ['./update-income.component.css']
})
export class UpdateIncomeComponent implements OnInit {
  @ViewChild('tabs') tabGroup!: MatTabGroup;

  income: Income = new Income();
  id! : number;

  constructor(private incomeService: IncomeService,
    private authenticationService: AuthenticationService,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute) { }

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

  previousPage(): void {
    // implement relative routing importing/injecting Location and using .back()
    this.location.back()
  }

  onSubmit() {

    this.incomeService.updateIncome(this.id, this.income).subscribe({
      next: value => {
        this.goToUserDetails()
      },
      error: err => {
        console.log(err);
      }
    })
    
  }

  goToUserDetails(){
    if(this.authenticationService.getRole() =="ROLE_ADMIN"){
      this.router.navigate(['/admin/dashboard']);
    }
    else{
      this.router.navigate(['dashboard']);
    }
    this.previousPage();
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(['/update-user']);
      this.tabGroup.selectedIndex = 0;
  });
  }
}
