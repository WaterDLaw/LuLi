import { NgModule } from '@angular/core';
import { ClientsComponent } from "../clients/clients.component";
import { ClientsRoutingModule } from "../clients/clients-routing.module";
import { FormsModule }   from '@angular/forms';
import { AuthGuard } from "../../guards/auth.guard";

@NgModule({
  imports: [
    ClientsRoutingModule,
    FormsModule
  ],
  declarations: 
    [ 
      ClientsComponent
    ],
  providers:[AuthGuard]
})
export class ClientsModule { }
