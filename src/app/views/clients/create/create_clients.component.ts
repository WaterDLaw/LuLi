import { Component, OnInit } from '@angular/core';
import { Client } from "../../../models/Client";
import { ClientsService } from "../../../services/clients.service";
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-clients',
  templateUrl: './create_clients.component.html',
  styleUrls: ['./create_clients.component.scss']
})
export class CreateClientsComponent implements OnInit {

  patient: Client;

  constructor(
    private _clientsService: ClientsService,
    private router: Router
  ) { }

  ngOnInit() {

    this.patient = {} as Client;

  }

  onSubmit(){
    console.log(this.patient);

    this._clientsService.createClient(this.patient)
      .then(
          this.router.navigate(['clients'])
        
      )
      .catch(error => console.log(error));
      

  }

}
