import { NgModule } from '@angular/core';
import { TrainingsComponent } from "../trainings/trainings.component";
import { TrainingsRoutingModule } from "../trainings/trainings-routing.module";
import { FormsModule }   from '@angular/forms';
import { AuthGuard } from "../../guards/auth.guard";

@NgModule({
  imports: [
    TrainingsRoutingModule,
    FormsModule
  ],
  declarations: 
    [ 
        TrainingsComponent
    ],
  providers:[AuthGuard]
})
export class TrainingsModule { }
