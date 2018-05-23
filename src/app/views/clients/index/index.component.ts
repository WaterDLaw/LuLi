import { Component, OnInit } from '@angular/core';
import { ClientsService } from "../../../services/clients.service";
import { Client } from "../../../models/Client";
import { subscribeOn } from 'rxjs/operator/subscribeOn';
@Component({
  selector: 'app-index-clients',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {


  patients: Array<Client>;
  public searchString: string;

  constructor(private _clientService: ClientsService) { }

  ngOnInit() {

   //this.patients$ = this._clientService.getClients();

    this._clientService.getClients()
      .subscribe(data => {
        // Get the body of the response
        this.patients = data;
      
      })

  }
  // Gets all Patients from the server
  getAllPatients(){

  }

}
