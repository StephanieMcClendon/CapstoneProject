import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GoalDetailsComponent } from './goal-details/goal-details.component';
import { HttpClientModule } from '@angular/common/http';
import { GoalListComponent } from './goal-list/goal-list.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    AppComponent,
    GoalDetailsComponent,
    GoalListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    NgChartsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
