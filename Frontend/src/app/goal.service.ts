import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Goal } from './goal';

@Injectable({
  providedIn: 'root'
})
export class GoalService {

  private baseURL = "http://localhost:8080/goals";

  constructor(private httpClient: HttpClient) { }

  getGoalById(id: number): Observable<Goal>{
    return this.httpClient.get<Goal>(`${this.baseURL}/${id}`);
  }

  getGoalsList(): Observable<Goal[]>{
    return this.httpClient.get<Goal[]>(`${this.baseURL}`);
  }

  deleteGoal(id: number): Observable<Goal>{
    return this.httpClient.delete<Goal>(`${this.baseURL}/${id}`);
  }

  createGoal(goal: Goal): Observable<any>{
    return this.httpClient.post(`${this.baseURL}`, goal);
  }

  updateGoal(id: number, goal: Goal): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, goal);
  }

  // @Output() clickEvent = new EventEmitter<string>();

  // switchGoalTab(msg: string) {
  //   this.clickEvent.emit(msg);
  // }
}
