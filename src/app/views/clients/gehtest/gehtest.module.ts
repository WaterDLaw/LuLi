import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { AuthGuard } from "../../../guards/auth.guard";
import { ClientsService } from "../../../services/clients.service";
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from "../../clients/clients-routing.module";
import { CreateGehtestComponent } from './create-gehtest/create-gehtest.component';
import { EditGehtestComponent } from './edit-gehtest/edit-gehtest.component';
import { ShowGehtestComponent } from './show-gehtest/show-gehtest.component';
import { IndexGehtestComponent } from './index-gehtest/index-gehtest.component';
import { GehtestService } from "../../../services/gehtest.service";
import { GehtestComponent } from './gehtest.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClientsRoutingModule
  ],
  declarations: 
    [
      CreateGehtestComponent,
      EditGehtestComponent,
      ShowGehtestComponent,
      IndexGehtestComponent,
      GehtestComponent
    ],
  providers:[AuthGuard, ClientsService, GehtestService]
})
export class GehtestModule { }
