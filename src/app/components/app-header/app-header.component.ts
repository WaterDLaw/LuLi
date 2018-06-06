import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html'
})

export class AppHeaderComponent {

  loggedIn: boolean;
  isLoggedIn$: Observable<boolean>; 
  currentUser?: string;

  public constructor(
    private _authService: AuthService
  ){
    
  }

  ngOnInit(){
    // Setze das Observable
    this.isLoggedIn$ = this._authService.isLoggedIn;
    // subscribed dem Observable welches für das den login Status zuständig ist.
    this.isLoggedIn$.subscribe(
      (data) =>{
        console.log("in sub");
        console.log(data);
        if(data){
          var user = localStorage.getItem('email');
          console.log(user);
          this.currentUser = user;
        }
      },
      (err) => {console.log(err)}, 
      ()=> console.log("complete"))
  }

  // Ruft die logout funktion im authService auf
  logout(){
    this._authService.logout();
  }

}
