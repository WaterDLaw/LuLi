import { NgModule } from '@angular/core';
import { ReportsComponent } from "../reports/reports.component";
import { ReportsRoutingModule } from "../reports/reports-routing.module";
import { FormsModule }   from '@angular/forms';
import { AuthGuard } from "../../guards/auth.guard";

@NgModule({
  imports: [
    ReportsRoutingModule,
    FormsModule
  ],
  declarations: 
    [ 
        ReportsComponent
    ],
  providers:[AuthGuard]
})
export class ReportsModule { }
