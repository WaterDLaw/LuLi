import { NgModule } from '@angular/core';
import { ClientsComponent } from "../clients/clients.component";
import { CreateClientsComponent } from "../clients/create/create_clients.component";
import { ClientsRoutingModule } from "../clients/clients-routing.module";
import { FormsModule }   from '@angular/forms';
import { AuthGuard } from "../../guards/auth.guard";
import { ClientsService } from "../../services/clients.service";

@NgModule({
  imports: [
    ClientsRoutingModule,
    FormsModule
  ],
  declarations: 
    [ 
      ClientsComponent,
      CreateClientsComponent
    ],
  providers:[AuthGuard, ClientsService]
})
export class ClientsModule { }
