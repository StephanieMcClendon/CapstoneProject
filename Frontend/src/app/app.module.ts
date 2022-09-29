import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalculatorComponent } from './finances/calculator/calculator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSliderModule} from "@angular/material/slider";
import { GoalDetailsComponent } from './goal-details/goal-details.component';
import { HttpClientModule } from '@angular/common/http';
import { GoalListComponent } from './goal-list/goal-list.component';
import { FormsModule } from '@angular/forms';
import {GOOGLE_CHARTS_LAZY_CONFIG, GoogleChartsConfig, GoogleChartsModule} from "angular-google-charts";
import {config, ReplaySubject} from "rxjs";
import {NgChartsModule } from 'ng2-charts';
export const googleChartsConfigSubject = new ReplaySubject<GoogleChartsConfig>(1);

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    GoalDetailsComponent,
      GoalListComponent
  ],

    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatSliderModule,
        HttpClientModule,
        FormsModule,
        GoogleChartsModule,
        NgChartsModule
    ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
