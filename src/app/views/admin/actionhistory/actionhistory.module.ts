import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActionHistoryRoutingModule } from './actionhistory-routing.module';
import { ActionhistoryComponent } from './actionhistory.component';
import { ActionHistoryService } from 'app/services/ActionHistory.service';

@NgModule({
  imports: [
    ActionHistoryRoutingModule,
    FormsModule,
    CommonModule
  ],
  declarations: 
    [ 
        ActionhistoryComponent
    ],
  providers:[ActionHistoryService]
})
export class ActionHistoryModule { }
