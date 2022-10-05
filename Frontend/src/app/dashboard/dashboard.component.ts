import { Component, OnInit, ViewChild } from '@angular/core';
import {Goal} from "../goal";
import {GoalService} from "../goal.service";
import {ActivatedRoute, Router} from "@angular/router";
import { MatTabGroup } from '@angular/material/tabs';
import { IncomeService } from '../income.service';
import { Income } from '../income';
import { Expense } from '../expense';
import { ExpenseService } from '../expense.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  @ViewChild('tabs') tabGroup!: MatTabGroup;

  // Goals
  goals?: any[];
  goal: Goal = new Goal();
  searchText: any;
  saveAmount: number = this.goal.saveAmount;
  monthlyPayment: number = this.goal.monthlyPayment;

  // Income
  incomes?: any[];
  income: Income = new Income();

  // Expenses
  expenses?: any[];
  expense: Expense = new Expense();

  constructor(private goalService: GoalService,
   private expenseService: ExpenseService,
   private incomeService: IncomeService,
   private route: ActivatedRoute,
   private router: Router) { }
   

  ngOnInit(): void {
    // @JsonIgnore in spring boot to avoid over populating db
    // OR update application.properties to update db instead of create
    this.getGoals();
    this.getExpenses();
    this.getIncome();
    
    
  }

  // ** GOAL Methods **
  private getGoals(){
    this.goalService.getGoalsList().subscribe(data => {
      this.goals = data;
      console.log(this.goals);
      for(let i = 0; i < this.goals!.length; i++){
        console.log(this.goals![i].saveAmount)
        if(this.goals![i].monthlyPayment === 0){
          // call congratulations();
          console.log("You win");
        }
      }
    });
    
  }

  congratulations(){
    // insert logic for pop up confetti

  }

  goToGoalDetails(id: number){
    this.router.navigate(['goal-details', id]);
  }

  updateGoal(id: number){
    this.router.navigate(['update-goal', id]);
  }

  deleteGoal(id: number){
    // routed to delete button
    this.goalService.deleteGoal(id).subscribe( data => {
      console.log(data);
      this.goToGoalList();
      this.getGoals();
    })
  }

  saveGoal(){
    // create button
    this.goalService.createGoal(this.goal).subscribe( data =>{
          console.log(data);
          this.getGoals();
        },
        error => console.log(error));
  }

  goToGoalList(){
    this.router.navigate(['/goals']);
  }

  onSubmitGoal(){
    console.log(this.goal);
    // user_id = user id of current user logged in
    
    this.monthlyPayment = (this.goal.goalAmount - this.goal.saveAmount) / this.goal.time_in_months;
    console.log(this.monthlyPayment);
    this.goal.monthlyPayment = this.monthlyPayment;
    this.tabGroup.selectedIndex = 2;
    this.saveGoal();
  }

  // ** INCOME Methods **

  private getIncome(){
    this.incomeService.getIncomeList().subscribe(data => {
      this.incomes = data;
      console.log(this.incomes);
    });
  }

  // no need for income details page

  updateIncome(id: number){
    this.router.navigate(['update-goal', id]);
  }

  deleteIncome(id: number){
    // routed to delete button
    this.incomeService.deleteIncome(id).subscribe( data => {
      console.log(data);
     this.getIncome();
    })
  }

  saveIncome(){
    // create button
    this.incomeService.createIncome(this.income).subscribe( data =>{
          console.log(data);
          this.getIncome();
        },
        error => console.log(error));
  }

  // no goal list needed, switch to tab instead

  onSubmitIncome() {
    // swipes to income tab
    this.tabGroup.selectedIndex = 0;
    this.saveIncome();
  }



  // ** EXPENSE Methods **

  private getExpenses(){
    this.expenseService.getExpenseList().subscribe(data => {
      this.expenses = data;
      console.log(this.expenses);
    });
  }

  // no need for income details page

  updateExpense(id: number){
    this.router.navigate(['update-expense', id]);
  }

  deleteExpense(id: number){
    // routed to delete button
    this.expenseService.deleteExpense(id).subscribe( data => {
      console.log(data);
    })
  }

  saveExpense(){
    // create button
    this.expenseService.createExpense(this.expense).subscribe( data =>{
          console.log(data);

        },
        error => console.log(error));
  }

  onSubmitExpense() {
    // swipes to expense tab
    this.tabGroup.selectedIndex = 1;
    this.saveExpense();
  }

  
//   let canvas, ctx, w, h, laser, text, particles, input;

// function Laser(options) {
//     options = options || {};
//     this.lifespan = options.lifespan || Math.round(Math.random() * 20 + 20);
//     this.maxlife = this.lifespan;
//     this.color = options.color || '#fd2423';
//     this.x = options.x || Math.random() * w;
//     this.y = options.y || Math.random() * h;
//     this.width = options.width || 2;

//     this.update = function(index, array) {
//         this.lifespan > 0 && this.lifespan--;
//         this.lifespan <= 0 && this.remove(index, array);
//     }

//     this.render = function(ctx) {
//         if (this.lifespan <= 0) return;
//         ctx.beginPath();
//         ctx.globalAlpha = this.lifespan / this.maxlife;
//         ctx.strokeStyle = this.color;
//         ctx.lineWidth = this.width;
//         ctx.moveTo(this.x, this.y);
//         ctx.lineTo(w, this.y);
//         ctx.stroke();
//         ctx.closePath();
//     }

//     this.remove = function(index, array) {
//         array.splice(index, 1);
//     }
// }

// function Spark(options) {
//     options = options || {};
//     this.x = options.x || w * 0.5;
//     this.y = options.y || h * 0.5;
//     this.v = options.v || { direct: Math.random() * Math.PI * 2, weight: Math.random() * 10 + 2, friction: 0.94 };
//     this.a = options.a || { change: Math.random() * 0.2 - 0.1, min: this.v.direct - Math.PI * 0.4, max: this.v.direct + Math.PI * 0.4 };
//     this.g = options.g || { direct: Math.PI * 0.5 + (Math.random() * 0.4 - 0.2), weight: Math.random() * 0.5 + 0.5 };
//     this.width = options.width || Math.random() * 3;
//     this.lifespan = options.lifespan || Math.round(Math.random() * 20 + 40);
//     this.maxlife = this.lifespan;
//     this.color = options.color || '#fdab23';
//     this.prev = { x: this.x, y: this.y };

//     this.update = function(index, array) {
//         this.prev = { x: this.x, y: this.y };
//         this.x += Math.cos(this.v.direct) * this.v.weight;
//         this.x += Math.cos(this.g.direct) * this.g.weight;
//         this.y += Math.sin(this.v.direct) * this.v.weight;
//         this.y += Math.sin(this.g.direct) * this.g.weight;
//         this.v.weight *= this.v.friction;
//         this.v.direct += this.a.change;
//         (this.v.direct > this.a.max || this.v.direct < this.a.min) && (this.a.change *= -1);
//         this.lifespan > 0 && this.lifespan--;
//         this.lifespan <= 0 && this.remove(index, array);
//     }

//     this.render = function(ctx) {
//         if (this.lifespan <= 0) return;
//         ctx.beginPath();
//         ctx.globalAlpha = this.lifespan / this.maxlife;
//         ctx.strokeStyle = this.color;
//         ctx.lineWidth = this.width;
//         ctx.moveTo(this.x, this.y);
//         ctx.lineTo(this.prev.x, this.prev.y);
//         ctx.stroke();
//         ctx.closePath();
//     }

//     this.remove = function(index, array) {
//         array.splice(index, 1);
//     }
// }

// function Particles(options) {
//     options = options || {};
//     this.max = options.max || Math.round(Math.random() * 20 + 10);
//     this.sparks = [...new Array(this.max)].map(() => new Spark(options));

//     this.update = function() {
//         this.sparks.forEach((s, i) => s.update(i, this.sparks));
//     }

//     this.render = function(ctx) {
//         this.sparks.forEach(s => s.render(ctx));
//     }
// }

// function Text(options) {
//     options = options || {};
//     const pool = document.createElement('canvas');
//     const buffer = pool.getContext('2d');
//     pool.width = w;
//     buffer.fillStyle = '#000000';
//     buffer.fillRect(0, 0, pool.width, pool.height);

//     this.size = options.size || 100;
//     this.copy = (options.copy || `Hello!`) + ' ';
//     this.color = options.color || '#fecd96';
//     this.delay = options.delay || 4;
//     this.basedelay = this.delay;
//     buffer.font = `${this.size}px Comic Sans MS`;
//     this.bound = buffer.measureText(this.copy);
//     this.bound.height = this.size * 1.5;
//     this.x = options.x || w * 0.5 - this.bound.width * 0.5;
//     this.y = options.y || h * 0.5 - this.size * 0.5;

//     buffer.strokeStyle = this.color;
//     buffer.strokeText(this.copy, 0, this.bound.height * 0.8);
//     this.data = buffer.getImageData(0, 0, this.bound.width, this.bound.height);
//     this.index = 0;

//     this.update = function() {
//         if (this.index >= this.bound.width) {
//             this.index = 0;
//             return;
//         }
//         const data = this.data.data;
//         for (let i = this.index * 4; i < data.length; i += (4 * this.data.width)) {
//             const bitmap = data[i] + data[i + 1] + data[i + 2] + data[i + 3];
//             if (bitmap > 255 && Math.random() > 0.86) {
//                 const x = this.x + this.index;
//                 const y = this.y + (i / this.bound.width / 4);
//                 laser.push(new Laser({
//                     x: x,
//                     y: y
//                 }));
//                 Math.random() > 0.7 && particles.push(new Particles({
//                     x: x,
//                     y: y
//                 }));
//             }
//         }
//         this.delay-- < 0 && (this.index++ && (this.delay += this.basedelay));
//     }

//     this.render = function(ctx) {
//         ctx.putImageData(this.data, this.x, this.y, 0, 0, this.index, this.bound.height);
//     }
// }

// function loop() {
//     update();
//     render();
//     requestAnimationFrame(loop);
// }

// function update() {
//     text.update();
//     laser.forEach((l, i) => l.update(i, laser));
//     particles.forEach(p => p.update());
// }

// function render() {
//     ctx.globalCompositeOperation = 'source-over';
//     ctx.globalAlpha = 0.9;
//     ctx.fillStyle = '#000000';
//     ctx.fillRect(0, 0, w, h);
//     //
//     ctx.globalCompositeOperation = 'screen';
//     text.render(ctx);
//     laser.forEach(l => l.render(ctx));
//     particles.forEach(p => p.render(ctx));
// }

// (function () {
//     //
//     canvas = document.getElementById('canvas');
//     input = document.getElementById('input');
//     ctx = canvas.getContext('2d');
//     w = window.innerWidth;
//     h = window.innerHeight;
//     canvas.width = w;
//     canvas.height = h;
//     laser = [];
//     particles = [];
//     //
//     text = new Text({
//         copy: 'Anh Yêu Em!'
//     });
//     canvas.addEventListener('click', (e) => {
//         const x = e.clientX;
//         const y = e.clientY;
//         laser.push(new Laser({
//             x: x,
//             y: y
//         }));
//         particles.push(new Particles({
//             x: x,
//             y: y
//         }));
//     });
//     let cb = 0;
//     input.addEventListener('keyup', (e) => {
//         clearTimeout(cb);
//         cb = setTimeout(() => {
//             text = new Text({
//                 copy: input.value
//             });
//         }, 300);
//     });
//     //
//     loop();
// })()
}
