import { Component, OnInit } from '@angular/core';
import { Client } from "../../../models/Client";
import { ClientsService } from "../../../services/clients.service";
import { Router } from '@angular/router';
import { Pneumologist } from '../../../models/pneumologist';
import { PneumologistService } from '../../../services/pneumologist.service';
@Component({
  selector: 'app-create-clients',
  templateUrl: './create_clients.component.html',
  styleUrls: ['./create_clients.component.scss']
})
export class CreateClientsComponent implements OnInit {

  patient: Client;
  pneumologists: Pneumologist;

  constructor(
    private _clientsService: ClientsService,
    private _pneumologistService: PneumologistService,
    private router: Router
  ) { }

  ngOnInit() {

    this.patient = {} as Client;

    this._pneumologistService.getPneumologists()
    .subscribe(data => {
      console.log(data);
      // Get the body of the response
      this.pneumologists = data;
    
    })


  }

  onSubmit(){
    console.log(this.patient);

    this._clientsService.createClient(this.patient)
      .then(
        data =>{
          this.router.navigate(['clients'])
        }
      )
      .catch(error => console.log(error));
      

  }

}
