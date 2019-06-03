import { Component, OnInit } from '@angular/core';
import { Client } from "../../../models/Client";
import { ClientsService } from "../../../services/clients.service";
import { Router, ActivatedRoute } from '@angular/router';
import { PneumologistService } from '../../../services/pneumologist.service';
import { Pneumologist } from '../../../models/pneumologist';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  patient: Client;
  showForm: boolean;
  pneumologists: Pneumologist;
  copdchecked:boolean;
  constructor(
    private _clientsService: ClientsService,
    private _pneumologistService: PneumologistService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.showForm = false;
    // Load Client
    this._clientsService.getClient(this.route.snapshot.params['id'])
      .subscribe(data =>{
        console.log(data);
        this.patient = data;
        if(this.patient.chronisch_obstruktive_Lungenkrankheit == true){
          this.copdchecked = true;
          console.log("TRUEEEE");    
        }
        this.showForm = true;
      })
      this._pneumologistService.getPneumologists()
      .subscribe(data => {
        console.log(data);
        // Get the body of the response
        this.pneumologists = data;
      
      })
  }

  onSubmit(){
    this._clientsService.updateClient(this.patient)
    .then(
      data => {
        this.router.navigate(['clients'])
      }
    )
    .catch(error => console.log(error));
    

  }

  checkCOPD(){
    this.copdchecked = !this.copdchecked;
    console.log("COPD IS" + this.copdchecked) ;
  }

}
