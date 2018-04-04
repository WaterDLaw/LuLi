import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { TrainingsComponent } from './trainings.component';
import { AuthGuard } from "../../guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: TrainingsComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Trainings'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingsRoutingModule {}