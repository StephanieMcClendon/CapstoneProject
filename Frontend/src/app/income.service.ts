import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Income } from './income';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  private baseURL = "http://localhost:8080/income";

  constructor(private httpClient: HttpClient) { }
  
  getIncomeList(userId: number): Observable<Income[]>{
    return this.httpClient.get<Income[]>(`${this.baseURL}/user/${userId}`);
  }

  createIncome(income: Income, userId: number): Observable<any>{
    return this.httpClient.post(`${this.baseURL}/${userId}`, income);
  }

  getIncomeById(id: number): Observable<Income>{
    return this.httpClient.get<Income>(`${this.baseURL}/${id}`);
  }

  updateIncome(id: number, income: Income): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, income);
  }

  deleteIncome(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
}