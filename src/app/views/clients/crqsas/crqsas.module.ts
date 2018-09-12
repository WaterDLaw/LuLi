import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { AuthGuard } from "../../../guards/auth.guard";
import { ClientsService } from "../../../services/clients.service";
import { CommonModule } from '@angular/common';

import { CrqsasService } from '../../../services/crqsas.service';
import { CreateCrqsasComponent } from './create-crqsas/create-crqsas.component';
import { EditCrqsasComponent } from './edit-crqsas/edit-crqsas.component';
import { ShowCrqsasComponent } from './show-crqsas/show-crqsas.component';
import { IndexCrqsasComponent } from './index-crqsas/index-crqsas.component';

import { ClientsRoutingModule } from "../../clients/clients-routing.module";
import { CrqsasComponent } from './crqsas.component';


@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ClientsRoutingModule
  ],
  declarations: 
    [ 
    CreateCrqsasComponent, 
    EditCrqsasComponent, 
    ShowCrqsasComponent, 
    IndexCrqsasComponent,
    CrqsasComponent
    ],
  providers:[AuthGuard, ClientsService, CrqsasService]
})
export class CrqsasModule { }
