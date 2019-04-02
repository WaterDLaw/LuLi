import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';
import { ActionhistoryComponent } from './actionhistory.component';


const routes: Routes = [
  {
    path: '',
    component: ActionhistoryComponent,
    data: {
      title: 'actionhistory Index'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActionHistoryRoutingModule {}
