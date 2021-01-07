import { Component, OnInit } from '@angular/core';
import { Client } from "../../../models/Client";
import { Training } from "../../../models/Training";
import { ClientsService } from "../../../services/clients.service";
import { Router, ActivatedRoute } from '@angular/router';
import { Pneumologist } from '../../../models/pneumologist';
import { PneumologistService } from '../../../services/pneumologist.service';
import { TrainingsService } from '../../../services/trainings.service';
import { MesswerteService } from 'app/services/messwerte.service';
import { MailService } from 'app/services/mail.service';
@Component({
  selector: 'app-create-clients',
  templateUrl: './create_clients.component.html',
  styleUrls: ['./create_clients.component.scss']
})
export class CreateClientsComponent implements OnInit {

  patient: Client;
  trainings: Training;
  pneumologists: Pneumologist;
  copdchecked:boolean=false;
  trainingAdd: number;
  trainings_id;

  constructor(
    private _clientsService: ClientsService,
    private _pneumologistService: PneumologistService,
    private _messwerteService: MesswerteService,
    private _trainingService: TrainingsService,
    private router: Router,
    private route: ActivatedRoute,
    private _mailService: MailService
  ) { }

  ngOnInit() {

    this.patient = {} as Client;

    this.trainings_id = this.route.snapshot.params['id']
    this.trainingAdd = this.trainings_id;
    console.log(this.trainings_id);
    this.patient.status = "Starter"

    this._trainingService.getTrainings()
      .subscribe(data => {
        console.log(data);
        this.trainings = data;
      })

    this._pneumologistService.getPneumologists()
    .subscribe(data => {
      console.log(data);
      // Get the body of the response
      this.pneumologists = data;
    
    })


  }

  onSubmit(){
    console.log(this.patient);

    this._clientsService.createClient(this.patient,this.trainingAdd)
      .then(
        data =>{
          console.log(data);
          console.log(data.id);
          console.log(data[0]);
          console.log(this.trainingAdd);
          let messagemax="";
          let messagenew="";
          // check if patient was created or if there is an error
          if(data[0]=="false"){
            messagemax= "Die maximale Anzahl Patienten für diesen Kurs wurde erreicht. ";
          }
          if(data[1]=="false"){
            messagenew = "Die maximale Anzahl neuer Patienten für diesen Kurs wurde erreicht. ";
          }
          if(messagemax=="" && messagenew==""){
            console.log("create MESSWERT");
          // create an empty messwerte table
          this._messwerteService.createMesswerte(data.id)
          .then( result =>{

            //send email if everyhting worked out


            this.router.navigate(['clients'])
          })
          .catch(error => 
            console.log(error));
          }else{
            alert(messagemax + messagenew);
          }
          

          
        }
      )
      .catch(error => alert("Bitte überprüfen Sie das alle Pflichtfelder ausgefüllt sind."));
      

  }

  checkCOPD(){
    this.copdchecked = !this.copdchecked;
    console.log("COPD IS" + this.copdchecked) ;
  }

}
