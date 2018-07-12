declare var jsPDF: any;

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from "../../../models/Client";
import { Training } from "../../../models/Training";
import { ClientsService } from "../../../services/clients.service";
import { TrainingsService } from "../../../services/trainings.service";
import { DatePipe } from '@angular/common';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Cat } from '../../../models/Cat';
import { Gehtest } from '../../../models/Gehtest';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  measurmentEdit: boolean = false;

  closeResult: string;
  trainings: Array<Training>
  modalReference: any;

  // Reference Variables
  feedback: any;
  crqsasBefore: any;
  catBefore: Cat;
  gehtestBefore:Gehtest;

  crqsasAfter: any;
  catAfter: Cat;
  gehtestAfter: Gehtest;

  // Subscription references

  trainingSubscription: Subscription;
  feedbackSubscription: Subscription;
  crqsasBeforeSubscription: Subscription;
  crqsasAfterSubscription: Subscription;
  catBeforeSubscription: Subscription;
  catAfterSubscription: Subscription;
  gehtestBeforeSubscription: Subscription;
  gehtestAfterSubscription: Subscription;



  constructor(
    private route: ActivatedRoute,
    private _clientService: ClientsService,
    private modalService: NgbModal,
    private _trainingService: TrainingsService,
    private router: Router,
    private datePipe: DatePipe) { }

  patient = {} as Client;

  ngOnInit() {
    console.log("Routes");
    console.log('configured routes: ', this.router.config);

    this.getPatient(this.route.snapshot.params['id']);
    // load the Trainings
    this.getTrainings();
    this.checkFeedback(this.route.snapshot.params['id']);
    // Check if questionaries exists Before
    this.checkCrqsasBefore(this.route.snapshot.params['id']);
    this.checkCatBefore(this.route.snapshot.params['id']);
    this.checkGehtestBefore(this.route.snapshot.params['id']);

    // Check if questionaries exist After
    this.checkCrqsasAfter(this.route.snapshot.params['id']);
    this.checkCatAfter(this.route.snapshot.params['id']);
    this.checkGehtestAfter(this.route.snapshot.params['id']);
  }
  // Cancel subscriptions for performance boost

  ngOnDestroy() {
    this.trainingSubscription.unsubscribe();
    this.feedbackSubscription.unsubscribe();
    this.crqsasBeforeSubscription.unsubscribe();
    this.crqsasAfterSubscription.unsubscribe();
    this.catBeforeSubscription.unsubscribe();
    this.catAfterSubscription.unsubscribe();
    this.gehtestBeforeSubscription.unsubscribe();
    this.gehtestAfterSubscription.unsubscribe();
  }

  measurmentsEdit(){
    if(this.measurmentEdit){
      this.measurmentEdit = false;
    }else if(!this.measurmentEdit){
      this.measurmentEdit = true;
    }
   
  }

  measurmentsSave(){
    // Save the measurements changed in databse
    this._clientService.updateClient(this.patient)
      .then(success =>{
        console.log(success);
      })
      .catch(err =>{
        console.log(err);
      })

    if(this.measurmentEdit){
      this.measurmentEdit = false;
    }else if(!this.measurmentEdit){
      this.measurmentEdit = true;
    }
  }

  getPatient(id){
    this._clientService.getClient(id)
      .subscribe(data => {
        console.log("patient");
        console.log(data);
        this.patient = data;
      

      })
  }
  checkFeedback(id){
    this.feedbackSubscription = this._clientService.hasFeedback(id)
      .subscribe(data => {
        console.log("check Feedback");
        console.log(data);
        this.feedback = data;
      })
  }

  checkCrqsasBefore(id){
    this.crqsasBeforeSubscription =  this._clientService.hasCrqsasBefore(id)
      .subscribe(data => {
        console.log("check Crq");
        console.log(data);
        this.crqsasBefore = data;
      })
  }

  checkCrqsasAfter(id){
    this.crqsasAfterSubscription = this._clientService.hasCrqsasAfter(id)
      .subscribe(data => {
        console.log("check Crq");
        console.log(data);
        this.crqsasAfter = data;
      })
  }

  checkCatBefore(id){
    this.catBeforeSubscription = this._clientService.hasCatBefore(id)
      .subscribe(data => {
        console.log("check Cat");
        console.log(data);

        this.catBefore = data;
      })
  }

  checkCatAfter(id){
    this.catAfterSubscription = this._clientService.hasCatAfter(id)
      .subscribe(data => {
        console.log("check Cat");
        console.log(data);

        this.catAfter = data;
      })
  }

  checkGehtestBefore(id){
    this.gehtestBeforeSubscription = this._clientService.hasGehtestBefore(id)
      .subscribe(data => {
        console.log("check Gehtest");
        console.log(data);
        this.gehtestBefore = data;
      })
  }

  checkGehtestAfter(id){
    this.gehtestAfterSubscription = this._clientService.hasGehtestAfter(id)
      .subscribe(data => {
        console.log("check Gehtest After");
        console.log(data);
        this.gehtestAfter = data;
      })
  }

  getTrainings(){
    this.trainingSubscription = this._trainingService.getTrainings()
      .subscribe(data =>{
        console.log(data);
        this.trainings = data;
      })
  }

  getTrainingName(id):string{

    let trainingName: string;
    for(var i = 0; i< this.trainings.length; i++){
      if(this.trainings[i].id == id){
        trainingName = this.trainings[i].title;
      }
    }

    return trainingName;
  }

  addTraining(training: Training){
    // adds the training to the patient
    this._clientService.addTraining(this.patient, training)
      .then(data =>{
        //relaod the patients if succesful updated
        this.getPatient(this.route.snapshot.params['id']);
        this.modalReference.close();
      })
      .catch(error => {
        console.log(error);
      })
  }

  download(){
    var doc = new jsPDF();

      // Title
      doc.setFontSize(20);
      doc.text(20,20, 'Zusammenfassung ambulante pulmonale Rehabilitation');
      // Set Fontzise back to normal
      doc.setFontSize(10);

      // Stammdaten 

      doc.text(20,35,"Name:");
      doc.text(40,35,this.patient.name);

      // Kursdaten nocheinmal anschauen

      doc.text(20,40,"Vorname:");
      doc.text(40,40,this.patient.vorname);
      doc.text(20,45,"Geschlecht:");
      doc.text(40,45,this.patient.geschlecht);
      doc.text(20,50,"Geb.datum:");

      
      let d = new Date(this.patient.geburtsdatum.toString().replace('-','/'));
      var showDate = this.datePipe.transform(d, 'dd.MM.yyyy');
      console.log(showDate);

      doc.text(40,50,showDate);

      doc.text(20,55, "Diagnose");

      //For each diagnose create a new text
      var posY = 0;
      if(this.patient.asthma_bronchiale){
        doc.text(40,55 +posY, "Asthma bronchiale");
        posY = posY + 5;
      }else if(this.patient.chronisch_obstruktive_Lungenkrankheit){
        doc.text(40,55 +posY, "Chronisch obstruktive Lungenkrankheit");
        posY = posY + 5;   
      }else if(this.patient.funktionelle_atemstörung){
        doc.text(40,55 +posY, "Funktionelle Atemstörtung");
        posY = posY + 5;  
      }else if(this.patient.interstitielle_lungenkrankheit){
        doc.text(40,55 +posY, "Interstitielle Lungenkrankheit");
        posY = posY + 5;      
      }else if(this.patient.postoperative_lungenoperation){
        doc.text(40, 55 + posY, "Postoperative Lungenporation");
        posY = posY + 5;
      }else if(this.patient.thoraxwand_thoraxmuskelerkrankung){
        doc.text(40,55 + posY, "Thoraxwand Thoraxmuskelerkrankung");
        posY = posY + 5;
      }else if(this.patient.andere_lungenkrankheit){
        doc.text(40,55 + posY, "Andere Lungenkrankheit");
        posY = posY + 5;
      }

      posY = 55 + posY +5;

      doc.text(20,posY, "Rauchstatus");
      doc.text(40,posY, String(this.patient.rauchstatus));
      
      // Table Gewicht
      posY = posY + 10;
      
      var col = ["Messwert", "vorher", "nachher", "Differenz", "%"];
      var rows = [
        ["Gewicht(kg)", String(this.patient.gewicht_before), String(this.patient.gewicht_after), String(this.patient.gewicht_after - this.patient.gewicht_before), "leer"]
      ];

      //replace all null with 0
      for(let i = 0; i<rows.length; i++){
        if(rows[0][i] == null){
          rows[0][i] = "0";
        }
      }

      //create Margin for taple
      var options = {
        margin: {
          top: 50
        },
        startY: 70
      };

      doc.autoTable(col, rows, options);
 
      // Table Messwerte

      var rowsMesswerte = [
        ["FEV (l)", this.patient.fevl_before, this.patient.fevl_after, (this.patient.fevl_after -this.patient.fevl_before),"leer"],
        ["FEV %", this.patient.fevp_before,this.patient.fevp_after,(this.patient.fevp_after-this.patient.fevp_before),"leer"],
        ["VK max. (l)", this.patient.vkmaxl_before, this.patient.vkmaxl_after,(this.patient.vkmaxl_after-this.patient.vkmaxl_before), "leer"],
        ["VK %", this.patient.vkmaxp_before, this.patient.vkmaxp_after, (this.patient.vkmaxp_after-this.patient.vkmaxp_before),"leer"],
        ["V0 max. (ml)", this.patient.vo2max_before, this.patient.vo2max_after, (this.patient.vo2max_after-this.patient.vo2max_before),"leer"]
      ]

      col = ["Lungenfunktion", "vorher", "nachher", "Differenz", "%"];

      options = {
        margin: {
          top:50
        },
        startY: 90
      }; 

      doc.autoTable(col,rowsMesswerte,options);

      // CRQ
      col = ["CRQ","vorher", "nachher", "Differenz", "%"];
      var rowsCRQ = [
        ["Dyspnoe", 0, 0, 0, "leer"],
        ["Müdigkeit (Fatique)", 0, 0, 0, "leer"],
        ["Gefühlslage (Emotion)", 0, 0, 0, "leer"],
        ["Dyspnoe (Mastery)", 0, 0, 0, "leer"],
      ]
      options = {
        margin: {
          top:90
        },
        startY: 140
      }; 
      doc.autoTable(col,rowsCRQ,options);

      //Gehtest

      col = ["6 Min. Gehtest", "vorher", "nachher", "Differenz", "%"];

      // undefined
      let gehtestBeforeDistanz;
      let gehtestAfterDistanz;
      
      if(this.gehtestBefore[0]){
        gehtestBeforeDistanz = this.gehtestBefore[0].distanz
      }else{
        gehtestBeforeDistanz = "0"
      }

      if(this.gehtestAfter[0]){
        gehtestAfterDistanz = this.gehtestAfter[0].distanz
      }else{
        gehtestAfterDistanz = "0"
      }

      var rowsDistanz = [
        ["Distanz (m)", String(gehtestBeforeDistanz), String(gehtestAfterDistanz), String(gehtestAfterDistanz-gehtestBeforeDistanz), "leer"],
      ]

      options = {
        margin: {
          top:140
        },
        startY: 190
      }; 
      doc.autoTable(col,rowsDistanz,options);

      // Cat
      col = ["CAT", "vorher", "nachher", "Differenz", "%"];

      // undefined
      let catBeforeGesamt;
      let catAfterGesamt;

      if(this.catBefore.gesamtpunktzahl){
        catBeforeGesamt = this.catBefore.gesamtpunktzahl;
      }else{
        catBeforeGesamt = "0"
      }

      if(this.catAfter.gesamtpunktzahl){
        catAfterGesamt = this.catAfter.gesamtpunktzahl;
      }else{
        catAfterGesamt = "0"
      }

      var rowsCat = [
        ["0 < Punktzahl > 40", String(catBeforeGesamt), String(catAfterGesamt), String(catAfterGesamt-catBeforeGesamt), "leer"]
      ]

      options = {
        margin: {
          top:160
        },
        startY: 210
      }; 
      doc.autoTable(col,rowsCat,options);

      doc.save('Test.pdf');
  }

  openModal(content) {
    this.modalReference = this.modalService.open(content)
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
