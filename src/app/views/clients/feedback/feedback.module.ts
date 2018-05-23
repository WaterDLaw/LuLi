import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { AuthGuard } from "../../../guards/auth.guard";
import { ClientsService } from "../../../services/clients.service";
import { CommonModule } from '@angular/common';
import { CreateFeedbackComponent } from '../feedback/create-feedback/create-feedback.component';
import { EditFeedbackComponent } from '../feedback/edit-feedback/edit-feedback.component';
import { ShowFeedbackComponent } from '../feedback/show-feedback/show-feedback.component';
import { IndexFeedbackComponent } from '../feedback/index-feedback/index-feedback.component';
import { FeedbackComponent } from './feedback.component';
import { FeedbackService } from '../../../services/feedback.service';

import { ClientsRoutingModule } from "../../clients/clients-routing.module";


@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ClientsRoutingModule
  ],
  declarations: 
    [ 
      FeedbackComponent,
      CreateFeedbackComponent,
      EditFeedbackComponent,
      ShowFeedbackComponent,
      IndexFeedbackComponent
      
    ],
  providers:[AuthGuard, ClientsService, FeedbackService]
})
export class FeedbackModule { }
