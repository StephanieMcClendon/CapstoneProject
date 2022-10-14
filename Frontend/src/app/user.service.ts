import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Goal } from './goal';
import { User } from './model/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL = "http://localhost:8080/users";

  constructor(private httpClient: HttpClient) { }

  getUserById(id: number): Observable<User>{
    return this.httpClient.get<User>(`${this.baseURL}/${id}`);
  }


  getUserList(userId: number): Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.baseURL}/user/${userId}`);
  }

  getAllUsers(): Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.baseURL}`);
  }

  deleteUser(id: number): Observable<User>{
    return this.httpClient.delete<User>(`${this.baseURL}/${id}`);
  }

  createUser(user: User, userId: number): Observable<any>{
    return this.httpClient.post(`${this.baseURL}/${userId}`, user);
  }

  updateUser(id: number, user: User): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, user);
  }
}
