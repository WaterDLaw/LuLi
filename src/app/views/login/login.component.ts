import { Component, OnInit } from '@angular/core';
import { User } from "../../models/User";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user:User;

  constructor(
    private _authService: AuthService,
    private router: Router) {

    this.user = {
      email: "",
      password: "",
    }

  }

  ngOnInit() {
  }

  onSubmit(){
    
    console.log("data");
    console.log(this.user.email);
    console.log(this.user.password);
    this._authService.login(this.user.email,this.user.password)
    
      .subscribe(
        success => {
          console.log("success");
          console.log(success);
          // Set the active user
      
              // Wenn das login geklappt route zum dashboard
          this.router.navigate(['\dashboard']);      
        },
        error => this.errorHandler(error)
      );
  }

  errorHandler(error:any){
    console.log(error);
    if(error.error.error == "invalid_credentials"){
      alert("Falsches Passwort oder Email wurde eingegeben");
  }
  }

}
