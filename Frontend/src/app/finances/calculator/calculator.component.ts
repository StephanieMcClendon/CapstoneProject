import {Component, OnInit, ViewChild} from '@angular/core';
import {ChartConfiguration, ChartDataset, ChartOptions} from 'chart.js';
import {BaseChartDirective} from "ng2-charts";


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
  xAxis: number = 0;
  yAxis: number = 0;
  aprTotal: number = 0;
  isAprShown: boolean = false;
  aprFormula!: number;
  totalValueForApr: number = 0;


  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public chartData: ChartConfiguration<'line'>['data'] = {
    datasets: [
      {
        // ⤵️ Add these
        label: '$ USD by Month',
        data: [],

        pointHitRadius: 15, // expands the hover 'detection' area
        pointHoverRadius: 8, // grows the point when hovered

        // ⤵️ Add these
        pointRadius: 2,
        borderColor: '#ffffff', // main line color aka $midnight-medium from @riapacheco/yutes/seasonal.scss
        pointBackgroundColor: '#ffffff',
        pointHoverBackgroundColor: '#ffffff',
        pointBorderColor: '#ffffff',
        borderWidth: 2, // main line width
        hoverBorderWidth: 0, // borders on points
        pointBorderWidth: 0, // removes POINT borders
        tension: 0.3, // makes line more squiggly
      }
    ]
  };

  chartLabels: number[] = [];


  public chartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: true

  };

  line: string = "line";

  constructor() {
  }

  ngOnInit(): void
  {
    console.log("This is a simple calc")
    this.aprTotal = 0;
  }

  ngAfterViewInit(): void {
    // location.reload();
  }


  onSubmit() {
    this.monthlyPayment = ((this.savingsGoal - this.startingBalance) / ((this.months) + (this.years * 12)));
    // 10000 - 10% 2 - 2000
    // 10,000 / (.10) * (2)
    // 10,000 / .2 = 2,000
    // 12,000

    this.aprFormula = ((this.savingsGoal) * ((this.aprTotal/100) * (((this.months) + (this.years * 12))/12)));
    this.totalValueForApr = (this.aprFormula + this.savingsGoal) / ((this.months) + (this.years * 12));
    this.xAxis = (this.years * 12) + this.months;
    this.chartUpdate();

  }

  chartUpdate() {

    // update X-axis labels - months & Y-axis labels - amount per month
    this.chartLabels = [];
    this.chartData.datasets[0].data = [];
    this.chartLabels[0] = 0;
    this.chartData.datasets[0].data[0] = 0;
    this.yAxis = 0;
    for (let i = 1; i <= this.xAxis; i++) {
      this.chartLabels[i] = i;
      if(!this.isAprShown)
      {
        this.chartData.datasets[0].data[i] = (this.yAxis += this.monthlyPayment);
      }
      else{
        this.chartData.datasets[0].data[i] = (this.yAxis += this.totalValueForApr);
      }

    }
    this.chart?.update();

  }

  aprCalc() {
    this.isAprShown = !this.isAprShown;

    this.chartLabels = [];
    this.chartData.datasets[0].data = [];
    this.chartLabels[0] = 0;
    this.chartData.datasets[0].data[0] = 0;
    this.yAxis = 0;
    for (let i = 1; i <= this.xAxis; i++) {
      this.chartLabels[i] = i;
      if(!this.isAprShown)
      {
        this.chartData.datasets[0].data[i] = (this.yAxis += this.monthlyPayment);
      }
      else{
        this.chartData.datasets[0].data[i] = (this.yAxis += this.totalValueForApr);
      }

    }
    this.chart?.update();
  }
}