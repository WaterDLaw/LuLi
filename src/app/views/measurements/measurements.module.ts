import { NgModule } from '@angular/core';
import { MeasurementsComponent } from "../measurements/measurements.component";
import { MeasurementsRoutingModule } from "../measurements/measurements-routing.module";
import { FormsModule }   from '@angular/forms';
import { AuthGuard } from "../../guards/auth.guard";

@NgModule({
  imports: [
    MeasurementsRoutingModule,
    FormsModule
  ],
  declarations: 
    [ 
        MeasurementsComponent
    ],
  providers:[AuthGuard]
})
export class MeasurementsModule { }
