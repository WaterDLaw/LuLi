import { NgModule } from '@angular/core';
import { TrainingsComponent } from "../trainings/trainings.component";
import { TrainingsRoutingModule } from "../trainings/trainings-routing.module";
import { FormsModule }   from '@angular/forms';
import { AuthGuard } from "../../guards/auth.guard";
import { CreateTrainingComponent } from './create/create_training.component';
import { EditTrainingComponent } from './edit/edit_training.component';
import { IndexTrainingComponent } from './index/index_training.component';
import { ShowTrainingComponent } from './show/show_training.component';
import { TrainingsService } from "../../services/trainings.service";
import { ExcelService } from "../../services/Excel.service";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FilterTitlePipe } from "../../pipes/titleFilter";
import { MesswerteService } from 'app/services/messwerte.service';
import { ClientsService } from 'app/services/clients.service';


@NgModule({
  imports: [
    TrainingsRoutingModule,
    FormsModule,
    CommonModule,
    NgbModule.forRoot()
  ],
  declarations: 
    [ 
        TrainingsComponent,
        CreateTrainingComponent, 
        EditTrainingComponent, 
        IndexTrainingComponent, 
        ShowTrainingComponent,
        FilterTitlePipe
        
    ],
  providers:[AuthGuard, TrainingsService, MesswerteService, ClientsService, ExcelService]
})
export class TrainingsModule { }
