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

  getGoalsList(userId: number): Observable<Goal[]>{
    return this.httpClient.get<Goal[]>(`${this.baseURL}/user/${userId}`);
  }

  deleteGoal(id: number): Observable<Goal>{
    return this.httpClient.delete<Goal>(`${this.baseURL}/${id}`);
  }

  createGoal(goal: Goal, userId: number): Observable<any>{
    return this.httpClient.post(`${this.baseURL}/${userId}`, goal);
  }

  updateGoal(id: number, goal: Goal): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, goal);
  }

  // @Output() clickEvent = new EventEmitter<string>();

  // switchGoalTab(msg: string) {
  //   this.clickEvent.emit(msg);
  // }
}
