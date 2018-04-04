import { NgModule } from '@angular/core';
import { StatisticsComponent } from "../statistics/statistics.component";
import { StatisticsRoutingModule } from "../statistics/statistics-routing.module";
import { FormsModule }   from '@angular/forms';
import { AuthGuard } from "../../guards/auth.guard";

@NgModule({
  imports: [
    StatisticsRoutingModule,
    FormsModule
  ],
  declarations: 
    [ 
        StatisticsComponent
    ],
  providers:[AuthGuard]
})
export class StatisticsModule { }
