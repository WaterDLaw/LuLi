import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { AuthGuard } from "../../guards/auth.guard";
import { PneumologistsComponent } from './pneumologists.component';
import { CreatePneumologistComponent } from './create-pneumologist/create-pneumologist.component';
import { EditPneumologistComponent } from './edit-pneumologist/edit-pneumologist.component';
import { IndexPneumologistComponent } from './index-pneumologist/index-pneumologist.component';
import { ShowPneumologistComponent } from './show-pneumologist/show-pneumologist.component';

const routes: Routes = [
  {
    path: '',
    component: PneumologistsComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Pneumologists'
    }
  },
  {
    path: 'create',
    component: CreatePneumologistComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Create Pneumologists'
    }
  },
  {
    path: 'edit/:id',
    component: EditPneumologistComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Edit Pneumologists'
    }
  },
   
  {
    path: 'index',
    component: IndexPneumologistComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Show all Pneumologist'
    }
  },
   
  {
    path: 'show/:id',
    component: ShowPneumologistComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Show a Pneumologist'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PneumologistsRoutingModule {}