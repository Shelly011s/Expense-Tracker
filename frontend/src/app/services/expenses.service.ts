import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Expense } from '../Expense';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  private apiUrl="http://localhost:8080/api/expense";
  constructor(private http:HttpClient) { }
  
  getExpenses() : Observable<Expense[]>{
    return this.http.get<Expense[]>("http://localhost:8080/api/expenses/2023/4")
  }

  deleteExpense(Expense:Expense) :Observable<Expense[]>{
    const url=`${this.apiUrl}/${Expense.id}`;
    return this.http.delete<Expense[]>(url);
  }

  updateExpense(Expense:Expense) :Observable<Expense>{
    const url=`${this.apiUrl}/${Expense.id}`;
    return this.http.put<Expense>(url,Expense);
  }

  addExpense(Expense :Expense):Observable<Expense>{
    return this.http.post<Expense>(this.apiUrl, Expense);
  }
}
