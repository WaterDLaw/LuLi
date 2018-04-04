import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import "rxjs/add/observable/of";

@Injectable()
export class AuthService {

  public token: string;
  // BehavourSubject mit den Loogedin Data (init = False)
  public loginStatus: BehaviorSubject<any>= new BehaviorSubject<any>(false);
 

  constructor(
    private http: Http,
    private router: Router) { 
    
    
    // Setzt das Token wenn es im Localstorage gespeichert ist
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
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
    return this.http.post('http://localhost:8000/api/user/login', {email, password})
        .map((response: Response) => {
            // Das Login war erflogreich wenn ein token vorhanden ist

            let token = response.json() && response.json().token;
            if (token) {
                // Setze das Token
                this.token = token;

                // Speiche Token und User informationen in localStorage damit es auf Page refreshes vorhanden ist
                localStorage.setItem('currentUser', JSON.stringify({ email: email, token: token }));

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
      localStorage.removeItem('currentUser');
      // sende false an das Observable
      this.loginStatus.next(false);
      // Route zur Login page
      this.router.navigate(['/login']);
  }

}
