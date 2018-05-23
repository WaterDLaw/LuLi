import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { TrainingsComponent } from './trainings.component';
import { CreateTrainingComponent } from "./create/create_training.component";
import { EditTrainingComponent } from "./edit/edit_training.component";
import { ShowTrainingComponent } from "./show/show_training.component";
import { IndexTrainingComponent } from "./index/index_training.component";
import { AuthGuard } from "../../guards/auth.guard";
import { importExpr } from '@angular/compiler/src/output/output_ast';

const routes: Routes = [
  {
    path: '',
    component: TrainingsComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Trainings'
    }
  },
  {
    path: 'create',
    component: CreateTrainingComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Create Training'
    }
  },
  {
    path: 'edit/:id',
    component: EditTrainingComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Edit Training'
    }
  },
  {
    path: 'show/:id',
    component: ShowTrainingComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Show Training'
    },
   
  },
  {
    path: 'index',
    component: IndexTrainingComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Show all Trainings'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingsRoutingModule {}