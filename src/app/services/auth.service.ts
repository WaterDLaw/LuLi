import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { HttpClient,HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from "../../environments/environment";
import { User } from "../models/User";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import "rxjs/add/observable/of";

@Injectable()
export class AuthService {

  public token: string;
activeUser:User;
  // BehavourSubject mit den Loogedin Data (init = False)
  public loginStatus: BehaviorSubject<any>= new BehaviorSubject<any>(false);
 
  private apiurl = environment.apiurl;

  constructor(
    private http: HttpClient,
    private router: Router) { 
    
    
    // Setzt das Token wenn es im Localstorage gespeichert ist
    var currentUser = localStorage.getItem('email');
    this.token = this.getToken();
    console.log(currentUser);

    // Passt den initialwert an das Token an
    if(currentUser != null){
        console.log("b is true");
        this.loginStatus.next(true);
    }else{
        console.log("b is false");
        this.loginStatus.next(false);
    }
  }

  // returned den den loginStatus als Observable
  get isLoggedIn(): Observable<any>{
      return this.loginStatus.asObservable();
  }

  setTrue(){
      this.loginStatus.next(true);
  }

  login(email: string, password: string): Observable<boolean> {
    console.log(email);
    console.log(password);
    return this.http.post(this.apiurl + '/api/user/login', {email, password})
        .map((response: User) => {
            // Das Login war erflogreich wenn ein token vorhanden ist
            console.log("RESPONSE");
            console.log(response);
            let token = response && response.token;
            if (token) {
                // Setze das Token
                this.token = token;

                // Speiche Token und User informationen in localStorage damit es auf Page refreshes vorhanden ist
                localStorage.setItem('email', email);
                localStorage.setItem('token', token);
                // return true wenn das login geklappt hat
                console.log("sende true");    
                // Sende den werte True an das BehavourSubject   
                this.loginStatus.next(true);
                

                return true;
            } else {
                // return false wenn es nicht geklappt hat
                console.log("sende false");
                // Sende den werte False an das BehavourSubject 
                this.loginStatus.next(true);

                return false;
            }
        });
        
  }

  logout(): void {
      // Setze das token auf null und entferne den User aus dem Localstorage
      this.token = null;
      // remove den User aus dem Localstorage
      localStorage.removeItem('email');
      localStorage.removeItem('token');

      // sende false an das Observable
      this.loginStatus.next(false);

      // remove activeUser
      this.activeUser = null;
      // Route zur Login page
      this.router.navigate(['/login']);
  }

  getToken(){
      return localStorage.getItem('token');
  }

  // Function returns the current User by Email
  getCurrentUser(email:string){
    const token = this.getToken();
    return this.http.get<User>(this.apiurl + `/api/user/loggedIn/${email}?token=` + token).toPromise();
  }

  // Function returns activeUser
  getActiveUser(){
      return this.activeUser;
  }

  setActiveUser(user){
      this.activeUser = user;
  }

}
