import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { StatisticsComponent } from './statistics.component';
import { AuthGuard } from "../../guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: StatisticsComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Statistics'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticsRoutingModule {}
