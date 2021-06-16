import { Component, OnInit } from '@angular/core';
import { ClientsService } from "../../services/clients.service";
import { Client } from "../../models/Client";
import { Messwerte } from "../../models/Messwerte";
import { StatisticService } from '../../services/statistic.service';
import { Angular5Csv } from 'angular5-csv/dist/Angular5-csv';
import { StatistikPipe } from "../../pipes/statistikFilter";
import { MesswerteService } from "../../services/messwerte.service";
import { CatService } from "../../services/cat.service";
import { CrqsasService } from "../../services/crqsas.service";
import { ExcelService } from 'app/services/Excel.service';
import { Crqsas } from 'app/models/Crqsas';
import { saveAs } from 'file-saver';
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

  arrEntry;
  arrCrqsasBefore: any[] = [];
  arrCrqsasAfter: any[] = []
  arrCatBefore: any[] = [];
  arrCatAfter: any[] = [];

  years: string[];

  constructor(
    private _clientService: ClientsService,
    private _statisticsService: StatisticService,
    private statistikPipe: StatistikPipe,
    private _crqsasService: CrqsasService,
    private _catService: CatService,
    private _messwerteService: MesswerteService,
    private _excelService: ExcelService
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
    for(let i = -2; i <= 20; i++){

      years.push((currentYear +i).toString());
      
    }
    return years;

  }

  async excelExport(){



    //apply pipe
    var data = this.statistikPipe.transform(this.patients,this.selectedGeschlecht,this.selectedOrt,this.selectedKurs,this.selectedStatus,this.selectedJahr);

    //Get all other information from the client from the database
    console.log(data);
    this.arrCrqsasBefore = this.getCrqsasBefore(data)
    console.log(this.arrCrqsasBefore)
    this.arrCrqsasAfter= this.getCrqsasAfter(data)
    console.log(this.arrCrqsasAfter)
    this.arrCatBefore= this.getCatBefore(data);
    console.log(this.arrCatBefore)
    this.arrCatAfter = this.getCatAfter(data);
    console.log(this.arrCatAfter)

    //async problem bad solution with timout 3 sec
    alert("Download wird vorbereitet");
    setTimeout(() => 
    {
      this.downloadExcelStatistic(data,this.arrCatBefore,this.arrCatAfter,this.arrCrqsasBefore,this.arrCrqsasAfter);
    },
    8000);

  }

  downloadExcelStatistic(data,arrCatBefore,arrCatAfter,arrCrqsasBefore,arrCrqsasAfter){
  
    this._excelService.createExcelStatistic(data,arrCatBefore,arrCatAfter,arrCrqsasBefore,arrCrqsasAfter).then(blob=>{
      console.log("BLOOOOOOB")
      saveAs(new Blob([blob]), 'statistic.xlsx');
    })
  }



  // async functions
  getCrqsasBefore(data){
    let arrCrqsasBefore: any[] = [];
    for (let entry of data){
      // get the crqsas results
      const promise = this._clientService.hasCrqsasBefore(entry.patient_id).toPromise()
      promise.then((data)=>{
        if (data){
          arrCrqsasBefore.push(data[0]);
        }else{
          let emtpyObj = {
            id: null,
            created_at:null,
            updated_at: null,
            erstellungsdatum: null,
            frage_1: null,
            frage_2: null,
            frage_3: null,
            frage_4: null,
            frage_5: null,
            frage_6: null,
            frage_7: null,
            frage_8: null,
            frage_9: null,
            frage_10: null,
            frage_11: null,
            frage_12: null,
            frage_13: null,
            frage_14: null,
            frage_15: null,
            frage_16: null,
            frage_17: null,
            frage_18: null,
            frage_19: null,
            frage_20: null,
            gesamtpunktzahl: null,
            patient_id: null,
            erledigt: null,
            dyspnoe: null,
            fatique: null,
            emotion: null,
            mastery: null
          }
          arrCrqsasBefore.push(emtpyObj);
        }
        
      })

    }

    return arrCrqsasBefore;
  }
  
  getCrqsasAfter(data){
    let arrCrqsasAfter: any[] = [];
    for (let entry of data){

      // get the crqsas results
      const promise = this._clientService.hasCrqsasAfter(entry.patient_id).toPromise()
      promise.then((data)=>{
        if (data){
          arrCrqsasAfter.push(data[0]);
        }else{

          let emtpyObj =             {
            id: null,
            created_at:null,
            updated_at: null,
            erstellungsdatum: null,
            frage_1: null,
            frage_2: null,
            frage_3: null,
            frage_4: null,
            frage_5: null,
            frage_6: null,
            frage_7: null,
            frage_8: null,
            frage_9: null,
            frage_10: null,
            frage_11: null,
            frage_12: null,
            frage_13: null,
            frage_14: null,
            frage_15: null,
            frage_16: null,
            frage_17: null,
            frage_18: null,
            frage_19: null,
            frage_20: null,
            gesamtpunktzahl: null,
            patient_id: null,
            erledigt: null,
            dyspnoe: null,
            fatique: null,
            emotion: null,
            mastery: null
          }

          arrCrqsasAfter.push(emtpyObj);
        }
        
      })
 
    }

    return arrCrqsasAfter;
  }

  getCatBefore(data){
    let arrCatBefore: any[] = [];
    for (let entry of data){


      // get the crqsas results
      const promise = this._clientService.hasCatBefore(entry.patient_id).toPromise()
      promise.then((data)=>{
        if (data){
          arrCatBefore.push(data[0]);
        }else{
          let emtpyObj = {
            id: null,
            created_at: null,
            updated_at: null,
            erstellungsdatum: null,
            frage_1: null,
            frage_2: null,
            frage_3: null,
            frage_4: null,
            frage_5: null,
            frage_6: null,
            frage_7: null,
            frage_8: null,
            gesamtpunktzahl: null,
            patient_id: null,
            erledigt: null
          }

          
          arrCatBefore.push(emtpyObj);
        }
        
      })
      
    }

    return arrCatBefore;
  }

  getCatAfter(data){
    let arrCatAfter: any[] = [];
    for (let entry of data){


      // get the crqsas results
      const promise = this._clientService.hasCatAfter(entry.patient_id).toPromise()
      promise.then((data)=>{
        if (data){
          arrCatAfter.push(data[0]);
        }else{

          let emtpyObj = {
            id: null,
            created_at: null,
            updated_at: null,
            erstellungsdatum: null,
            frage_1: null,
            frage_2: null,
            frage_3: null,
            frage_4: null,
            frage_5: null,
            frage_6: null,
            frage_7: null,
            frage_8: null,
            gesamtpunktzahl: null,
            patient_id: null,
            erledigt: null
          }
          arrCatAfter.push(emtpyObj);
        }
        
      })
 
    }

    return arrCatAfter;
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
