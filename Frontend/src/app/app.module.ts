import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateIncomeComponent } from './create-income/create-income.component';
import { UpdateIncomeComponent } from './update-income/update-income.component';
import { IncomeListComponent } from './income-list/income-list.component';
import { IncomeDetailsComponent } from './income-details/income-details.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateIncomeComponent,
    UpdateIncomeComponent,
    IncomeListComponent,
    IncomeDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
