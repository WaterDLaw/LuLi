import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { FormsModule }   from '@angular/forms';

import { AuthGuard } from "../../guards/auth.guard";

@NgModule({
  imports: [
    DashboardRoutingModule,
    ChartsModule,
    FormsModule
  ],
  declarations: 
    [ 
      DashboardComponent
    ],
  providers:[AuthGuard]
})
export class DashboardModule { }
