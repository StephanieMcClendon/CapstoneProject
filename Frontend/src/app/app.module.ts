import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CreateIncomeComponent } from './create-income/create-income.component';
import { UpdateIncomeComponent } from './update-income/update-income.component';
import { IncomeListComponent } from './income-list/income-list.component';
import { IncomeDetailsComponent } from './income-details/income-details.component';

import { CalculatorComponent } from './finances/calculator/calculator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSliderModule} from "@angular/material/slider";
import { GoalDetailsComponent } from './goal-details/goal-details.component';
import { HttpClientModule } from '@angular/common/http';
import { GoalListComponent } from './goal-list/goal-list.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {GOOGLE_CHARTS_LAZY_CONFIG, GoogleChartsConfig, GoogleChartsModule} from "angular-google-charts";
import {config, ReplaySubject} from "rxjs";
import {NgChartsModule } from 'ng2-charts';
import { ExpenseComponent } from './expense/expense.component';

import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { UpdateGoalComponent } from './update-goal/update-goal.component';
import { MatTabsModule } from "@angular/material/tabs";
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgParticlesModule } from "ng-particles";
import { UpdateExpenseComponent } from './update-expense/update-expense.component';
import { RegisterComponent } from './register/register.component';

import {NotifierModule} from "angular-notifier";
import {NotificationModule} from "./notification.module";
import {NotificationService} from "./service/notification.service";
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import {NgPasswordValidatorModule} from "ng-password-validator";


@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    GoalDetailsComponent,
      GoalListComponent,
      ExpenseComponent,
      LoginComponent,
      IncomeListComponent,
      CreateIncomeComponent,
      UpdateIncomeComponent,
    LogoutComponent,
    UpdateGoalComponent,
    DashboardComponent,
    UpdateExpenseComponent,
    RegisterComponent,
    AdminDashboardComponent,
    UpdateUserComponent,
    UserDetailsComponent

  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatSliderModule,
        HttpClientModule,
        FormsModule,
        NgChartsModule,
        MatTabsModule,
        NgParticlesModule,
        NotificationModule,
        NgPasswordValidatorModule
    ],

  providers: [NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
