import { NgModule } from '@angular/core';
import { UsersRoutingModule } from "./users-routing.module";
import { FormsModule }   from '@angular/forms';
import { CreateUserComponent } from "./create-user/create-user.component";
import { EditUserComponent } from "./edit-user/edit-user.component";
import { UsersComponent } from './users.component';
import { UsersService } from '../../../services/users.service';
import { FilterPipe } from "../../../pipes/nameFilter";
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    UsersRoutingModule,
    FormsModule,
    CommonModule
  ],
  declarations: 
    [ 
        CreateUserComponent,
        EditUserComponent,
        UsersComponent,
        FilterPipe
    ],
  providers:[UsersService]
})
export class UsersModule { }
