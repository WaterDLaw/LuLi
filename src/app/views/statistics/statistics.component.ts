import { Component, OnInit } from '@angular/core';
import { ClientsService } from "../../services/clients.service";
import { Client } from "../../models/Client";
import { StatisticService } from '../../services/statistic.service';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import { StatistikPipe } from "../../pipes/statistikFilter";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  closeResult: string;
  patients: Array<any>;
  public searchString: string;
  public patientId: number;

  selectedGeschlecht: string = "alle";
  selectedOrt: string;
  selectedKurs: string;
  selectedStatus: string;
  selectedJahr: string;
  selectedDiagnose: string;

  years: string[];

  constructor(
    private _clientService: ClientsService,
    private _statisticsService: StatisticService,
    private statistikPipe: StatistikPipe
  ) { }

  ngOnInit() {
    this.getClients();

    //create year array
    this.years = this.createYearArray();
  }

  getClients(){
    this._statisticsService.getStatisticInfos()
      .subscribe(data => {
        // Get the body of the response
        console.log(data);
        this.patients = data;
      
      })

  }

  createYearArray(): string[]{
    let years: string[] = [];
    let ageGap = 14;
    let date = new Date();
    let currentYear = date.getFullYear();

    years.push("alle");
    for(let i = 0; i <= 100; i++){

      years.push((currentYear -i).toString());
      
    }
    return years;

  }

  csvExport(){

    //apply pipe
    var data = this.statistikPipe.transform(this.patients,this.selectedGeschlecht,this.selectedOrt,this.selectedKurs,this.selectedStatus,this.selectedJahr);
  
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
          "Pneumologe",
          "Rauchstatus",
          "Created_At Training",
          "Updated_At Training",
          "Titel",
          "Trainingsort",
          "Start",
          "Ende"
        ]
    
  
      }
      console.log(this.patients);
      new Angular5Csv(data, "ExportARP", options);
    }else{
      console.log("Patienten leer");
    }

    
  }

}
