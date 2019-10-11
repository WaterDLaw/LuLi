import { NgModule } from '@angular/core';
import { ClientsComponent } from "../clients/clients.component";
import { CreateClientsComponent } from "../clients/create/create_clients.component";
import { ClientsRoutingModule } from "../clients/clients-routing.module";
import { FormsModule }   from '@angular/forms';
import { AuthGuard } from "../../guards/auth.guard";
import { ClientsService } from "../../services/clients.service";
import { IndexComponent } from './index/index.component';
import { ShowComponent } from './show/show.component';
import { CommonModule, DatePipe } from '@angular/common';
// Custom Pipes
import { FilterPipe } from "../../pipes/nameFilter";
import { EditComponent } from './edit/edit.component';
import { TrainingsService } from '../../services/trainings.service';

// Fragebogen Modules
import { FeedbackModule } from './feedback/feedback.module';
import { CrqsasModule } from "./crqsas/crqsas.module";
import { CatModule } from './cat/cat.module';
import { GehtestModule } from "./gehtest/gehtest.module";

// Entry Module
import { CreateEntryComponent } from "./entry/create-entry/create-entry.component";

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { EntryService } from '../../services/entry.service';
import { ShowEntryComponent } from './entry/show-entry/show-entry.component';
import { IndexEntryComponent } from './entry/index-entry/index-entry.component';
import { EntryComponent } from "./entry/entry.component";
import { EditEntryComponent } from './entry/edit-entry/edit-entry.component';
import { PdfService } from '../../services/pdf.service';
import { PneumologistService } from '../../services/pneumologist.service';
import { MesswerteService } from 'app/services/messwerte.service';

import { ChartsModule } from 'ng2-charts';
@NgModule({
  imports: [
    FeedbackModule,
    ClientsRoutingModule,
    FormsModule,
    CommonModule,
    CrqsasModule,
    CatModule,
    GehtestModule,
    NgbModule,
    ChartsModule
  ],
  declarations: 
    [ 
      CreateClientsComponent,
      IndexComponent,
      ShowComponent,
      ClientsComponent,
      FilterPipe,
      EditComponent,
      CreateEntryComponent,
      ShowEntryComponent,
      IndexEntryComponent,
      EntryComponent,
      EditEntryComponent
    ],
  providers:[AuthGuard, ClientsService, TrainingsService, DatePipe, EntryService, PdfService, PneumologistService, MesswerteService]
})
export class ClientsModule { }
