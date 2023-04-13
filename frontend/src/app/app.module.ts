import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MonthlyComponent } from './components/monthly/monthly.component';
import { ExpenseComponent } from './components/expense/expense.component';
import { AddExpenseComponent } from './components/add-expense/add-expense.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StatsComponent } from './components/stats/stats.component';

@NgModule({
  declarations: [
    AppComponent,
    MonthlyComponent,
    ExpenseComponent,
    AddExpenseComponent,
    StatsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
