import { NgModule } from '@angular/core';
import { LoginComponent } from "../login/login.component";
import { LoginRoutingModule } from "../login/login-routing.module";
import { FormsModule }   from '@angular/forms';

@NgModule({
  imports: [
    LoginRoutingModule,
    FormsModule
  ],
  declarations: 
    [ 
      LoginComponent
    ],
  providers:[]
})
export class LoginModule { }
