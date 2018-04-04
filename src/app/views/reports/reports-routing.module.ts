import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { ReportsComponent } from './reports.component';
import { AuthGuard } from "../../guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: ReportsComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Reports'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule {}
