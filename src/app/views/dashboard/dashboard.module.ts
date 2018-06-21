import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { FormsModule }   from '@angular/forms';


import { CalendarComponent } from "../trainings/calendar/calendar.component";
import { TrainingsService } from '../../services/trainings.service';
import { CommonModule } from '@angular/common';



@NgModule({
  imports: [
    DashboardRoutingModule,
    ChartsModule,
    FormsModule,
    CommonModule
  ],
  declarations: 
    [ 
      DashboardComponent,
      CalendarComponent
    ],
  providers:[TrainingsService]
})
export class DashboardModule { }
