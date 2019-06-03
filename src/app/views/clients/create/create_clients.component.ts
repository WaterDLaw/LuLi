import { Component, OnInit } from '@angular/core';
import { Client } from "../../../models/Client";
import { ClientsService } from "../../../services/clients.service";
import { Router } from '@angular/router';
import { Pneumologist } from '../../../models/pneumologist';
import { PneumologistService } from '../../../services/pneumologist.service';
import { MesswerteService } from 'app/services/messwerte.service';
@Component({
  selector: 'app-create-clients',
  templateUrl: './create_clients.component.html',
  styleUrls: ['./create_clients.component.scss']
})
export class CreateClientsComponent implements OnInit {

  patient: Client;
  pneumologists: Pneumologist;
  copdchecked:boolean=false;

  constructor(
    private _clientsService: ClientsService,
    private _pneumologistService: PneumologistService,
    private _messwerteService: MesswerteService,
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
          console.log(data);
          console.log(data.id);

          // create an empty messwerte table
          this._messwerteService.createMesswerte(data.id)
            .then( result =>{

              this.router.navigate(['clients'])
            })
            .catch(error => console.log(error));

          
        }
      )
      .catch(error => console.log(error));
      

  }

  checkCOPD(){
    this.copdchecked = !this.copdchecked;
    console.log("COPD IS" + this.copdchecked) ;
  }

}
