import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-income-details',
  templateUrl: './income-details.component.html',
  styleUrls: ['./income-details.component.css']
})
export class IncomeDetailsComponent implements OnInit {

  id!:number;
  income_source?: String;
  amount?: number;
  frequency?:number;
  description?:String;
  income:Income= new Income();


  constructor(private incomeService: IncomeService,
    private route:ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.income=new this.income();
    this.incomeService.getIncomeById(this.id).subscribe(data =>){
      this.goal=data;
    }
  }

}
