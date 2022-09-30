import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Goal } from './goal';

@Injectable({
  providedIn: 'root'
})
export class GoalService {

  private baseURL = "http://localhost:4200/goals/";

  constructor(private httpClient: HttpClient) { }

  getGoalById(id: number): Observable<Goal>{
    return this.httpClient.get<Goal>(`${this.baseURL}/${id}`);
  }

}
