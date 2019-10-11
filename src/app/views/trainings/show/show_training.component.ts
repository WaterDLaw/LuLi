import { Component, OnInit } from '@angular/core';
import { TrainingsService } from '../../../services/trainings.service';
import { Training } from '../../../models/Training';
import { Client } from '../../../models/Client';
import { ActivatedRoute } from '@angular/router';
import { Angular5Csv } from 'angular5-csv/dist/Angular5-csv';

@Component({
  selector: 'app-show-training',
  templateUrl: './show_training.component.html',
  styleUrls: ['./show_training.component.scss']
})
export class ShowTrainingComponent implements OnInit {

  
  training = {} as Training;
  patients: Array<Client>;

  constructor(
    private _trainingsService: TrainingsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // Load Trainings
    this.getTraining(this.route.snapshot.params['id']);

    // Load Patients of this training
    this._trainingsService.getParticipants(this.route.snapshot.params['id'])
      .subscribe(data =>{
        console.log(data);
        this.patients = data;
        console.log(this.patients);
      })
  }

  getTraining(id){
    this._trainingsService.getTraining(id)
    .subscribe(data => {
      this.training = data;
      console.log(this.training);
    })
  }

  csvExport(){

    //apply pipe
    var data = this.patients;
  
    if(data != null){
      var options = { 
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalseparator: '.',
        showLabels: true, 
        showTitle: true,
        useBom: false,
        noDownload: false,
        headers: [
          "Id",
          "Created_at Patient",
          "Updated_at Patient",
          "Vorname",
          "Name",
          "Email",
          "Geburtsdatum",
          "Grösse",
          "Geschlecht",
          "Sprache",
          "Telefonnummer",
          "Strasse",
          "PLZ",
          "Ort",
          "Chronisch obstruktive Lungenkrankheit",
          "Zystische Fibrose",
          "Asthma bronchiale",
          "Interstitielle Lungenkrankheit",
          "Thoraxwand- und Thoraxmuskelerkrankung",
          "Andere Lungenkrankheit",
          "Prä- und postoperative Lungenoperation",
          "Funktionelle Atemstörung ",
          "Diagnose Details",
          "Bemerkungen",
          "Training_id",
          "Status",
          "pneumologistName",
          "pneumologistVorname",
          "Rauchstatus",
          "Created_At Training",
          "Updated_At Training",
          "Titel",
          "Trainingsort",
          "Start",
          "Ende"
        ]
    
  
      }
      new Angular5Csv(data, "ExportTeilnehmerARP " + this.training.title, options);
    }else{
      console.log("Patienten leer");
    }

    
  }

}
