import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';
import { AuthGuard } from "../../../guards/auth.guard";
import { CreateFeedbackComponent } from './create-feedback/create-feedback.component';
import { EditFeedbackComponent } from './edit-feedback/edit-feedback.component';
import { ShowFeedbackComponent } from './show-feedback/show-feedback.component';
import { IndexFeedbackComponent } from './index-feedback/index-feedback.component';

const routes: Routes = [
  {
    path: 'feedback/create',
    component: CreateFeedbackComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Create arp feedback'
    }
  },
  {
    path: 'feedback/show/:id',
    component: ShowFeedbackComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Show arp feedback'
    }
  },
  {
    path: 'feedback/edit',
    component: EditFeedbackComponent,
    canActivate: [AuthGuard],
    data:{
      title: 'Edit arp feedback'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedbackRoutingModule {}