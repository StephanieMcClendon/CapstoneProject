import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Expense } from './expense';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  
  private baseURL = "http://localhost:8080/expense";

  constructor(private httpClient: HttpClient) { }
  
  getExpenseList(userId: number): Observable<Expense[]>{
    return this.httpClient.get<Expense[]>(`${this.baseURL}/user/${userId}`);
  }

  createExpense(expense: Expense, userId: number): Observable<any>{
    return this.httpClient.post(`${this.baseURL}/${userId}`, expense);
  }

  getExpenseById(id: number): Observable<Expense>{
    return this.httpClient.get<Expense>(`${this.baseURL}/${id}`);
  }

  updateExpense(id: number, expense: Expense): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, expense);
  }

  deleteExpense(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
}

