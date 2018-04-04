import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { MeasurementsComponent } from './measurements.component';
import { AuthGuard } from "../../guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: MeasurementsComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Measurements'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeasurementsRoutingModule {}
