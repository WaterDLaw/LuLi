import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';
import { CreateUserComponent } from "./create-user/create-user.component";
import { EditUserComponent } from './edit-user/edit-user.component';
import { UsersComponent } from './users.component';


const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    data: {
      title: 'User Index'
    }
  },
  {
    path: 'create-user',
    component: CreateUserComponent,
    data: {
      title: 'Create User'
    }
  },
  {
    path: 'edit-user/:id',
    component: EditUserComponent,
    data:{
        title: 'Edit User'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
