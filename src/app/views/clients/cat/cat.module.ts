import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { AuthGuard } from "../../../guards/auth.guard";
import { ClientsService } from "../../../services/clients.service";
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from "../../clients/clients-routing.module";

import { CreateCatComponent } from './create-cat/create-cat.component';
import { EditCatComponent } from './edit-cat/edit-cat.component';
import { ShowCatComponent } from './show-cat/show-cat.component';
import { IndexCatComponent } from './index-cat/index-cat.component';
import { CatComponent } from "./cat.component";
import { CatService } from '../../../services/cat.service';


@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ClientsRoutingModule
  ],
  declarations: 
    [ 
        CreateCatComponent,
        EditCatComponent,
        ShowCatComponent,
        IndexCatComponent,
        CatComponent
    ],
  providers:[AuthGuard, ClientsService, CatService]
})
export class CatModule { }
