import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { ClientsComponent } from './clients.component';
import { AuthGuard } from "../../guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: ClientsComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Clients'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule {}
