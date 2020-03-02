import { NgModule } from '@angular/core';
import { StatisticsComponent } from "../statistics/statistics.component";
import { StatisticsRoutingModule } from "../statistics/statistics-routing.module";
import { FormsModule }   from '@angular/forms';
import { AuthGuard } from "../../guards/auth.guard";
import { StatistikPipe } from "../../pipes/statistikFilter";
import { ClientsService } from '../../services/clients.service';
import { MesswerteService } from '../../services/messwerte.service';
import { CatService } from '../../services/cat.service';
import { CrqsasService } from '../../services/crqsas.service';
import { CommonModule } from '@angular/common';
import { StatisticService } from '../../services/statistic.service';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ExcelService } from 'app/services/Excel.service';
@NgModule({
  imports: [
    StatisticsRoutingModule,
    FormsModule,
    CommonModule,
    NgbModule
  ],
  declarations: 
    [ 
        StatisticsComponent,
        StatistikPipe
    ],
  providers:[AuthGuard, ClientsService, StatisticService, StatistikPipe,CrqsasService, MesswerteService, CatService, ExcelService]
})
export class StatisticsModule { }
