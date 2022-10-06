import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {User} from "../model/user";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseApi: string = "http://localhost:8080"
  public role!: string | null;

  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);



  constructor(private http: HttpClient) { }

  public login(user: User): Observable<HttpResponse<any>>
  {
    return this.http.post<HttpResponse<any>>(`${this.baseApi}/api/v1/login`, user, {observe: 'response'});
  }

  public register(user: User): Observable<User | HttpErrorResponse>
  {
    return this.http.post<User | HttpErrorResponse>(`${this.baseApi}/api/v1/register`, user);
  }

  public addUserToLocalCache(user: User): void
  {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("username", JSON.stringify(user?.username));
    localStorage.setItem("id", JSON.stringify(user?.id));
    localStorage.setItem("role", JSON.stringify(user?.role));
    localStorage.setItem("auth_token98329293", JSON.stringify(user))
  }

  public isUserLoggedIn(): boolean
  {
    let user = localStorage.getItem("auth_token98329293");
    if(user === null)
    {
      return false
    }
    return true

  }

  public getRole()
  {
    this.role = JSON.parse(localStorage.getItem("role")!);
    // console.log(this.role);
    return this.role;
  }

  public logout()
  {
    localStorage.removeItem("user");
    localStorage.removeItem("id");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("auth_token98329293");
  }
}
