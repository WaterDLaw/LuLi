import { Component, OnInit } from '@angular/core';
import { TrainingsService } from '../../../services/trainings.service';
import { MesswerteService } from '../../../services/messwerte.service';
import { Training } from '../../../models/Training';
import { Client } from '../../../models/Client';
import { ActivatedRoute } from '@angular/router';
import { Angular5Csv } from 'angular5-csv/dist/Angular5-csv';
import { ClientsService } from 'app/services/clients.service';
import { ExcelService } from 'app/services/Excel.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-show-training',
  templateUrl: './show_training.component.html',
  styleUrls: ['./show_training.component.scss']
})
export class ShowTrainingComponent implements OnInit {

  
  training = {} as Training;
  patients: Client[] = [];
  messwerte: any[] = [];
  arrCrqsasBefore: any[] = [];
  arrCrqsasAfter: any[] = []
  arrCatBefore: any[] = [];
  arrCatAfter: any[] = [];
  strTraining2: string;
  strTraining3: string;

  constructor(
    private _trainingsService: TrainingsService,
    private route: ActivatedRoute,
    private _messwerteService: MesswerteService,
    private _clientService: ClientsService,
    private _excelService: ExcelService
  ) { }

  ngOnInit() {
    // Load Trainings
    this.getTraining(this.route.snapshot.params['id']);
    this.getParticipants(this.route.snapshot.params['id']);
    //this.getParticipants(Number(this.route.snapshot.params['id']) + 1);
    //this.getParticipants(Number(this.route.snapshot.params['id']) + 2);
  }

  getParticipants(id){
    // Load Patients of this training
    console.log("correct id");
    console.log(id);
    this._trainingsService.getParticipants(id)
      .subscribe(data =>{
        console.log(data);
        data.sort(function(a,b){
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });

        // For each patient get the messwerte
        for (let entry of data){
          // get the crqsas results
          console.log(entry);
          const promise = this._messwerteService.getMesswerte(entry.id).toPromise()
            promise.then((mess)=>{
              console.log(mess);
              this.messwerte.push(mess[0]);
            })
          }
        // add the data to the array
        this.patients.push(...data);
        console.log(this.patients);
        console.log(this.messwerte);
      });
  }


  getTraining(id){
    this._trainingsService.getTraining(id)
    .subscribe(data => {
      this.training = data;
      console.log(this.training);

      //create training str:
      let training2Split = this.training.title.split(" ");
      let training2Num = Number(training2Split[2]) -1;
      //check if number is 0
      if(training2Num == 0){
        training2Num = 12;
        training2Split[1] = String(Number(training2Split[1]) -1);
      }
      this.strTraining2 = training2Split[0] + " " + training2Split[1] + " " + training2Num;
      training2Num = Number(training2Split[2]) -1;
      if(training2Num == 0){
        training2Num = 12;
        training2Split[1] = String(Number(training2Split[1]) -1);
      }
      this.strTraining3 = training2Split[0] + " " + training2Split[1] + " " + (training2Num -1)

      console.log(this.strTraining2);
      console.log(this.strTraining3);
    })
  }

  getBackgroundColor(status:string){
    console.log(status)
    let color = "white";
    if(status == "Nichtstarter"){
      color = 'lightgrey'
      console.log("grey")
    }else if(status == "Dropout"){
      color = 'lightgrey'
      console.log("grey")
    }else{
      color = "white"
      console.log("white")
    }
    return color;
  }

  async excelExport(){
    console.log(this.patients)
    //Get all other information from the client from the database
 
    this.arrCrqsasBefore = this.getCrqsasBefore(this.patients)
    console.log(this.arrCrqsasBefore)
    this.arrCrqsasAfter= this.getCrqsasAfter(this.patients)
    console.log(this.arrCrqsasAfter)
    this.arrCatBefore= this.getCatBefore(this.patients);
    console.log(this.arrCatBefore)
    this.arrCatAfter = this.getCatAfter(this.patients);
    console.log(this.arrCatAfter)

    //async problem bad solution with timout 3 sec

    setTimeout(() => 
    {
      console.log("inside Timout")
      this.downloadExcelStatistic(this.patients,this.messwerte,this.arrCatBefore,this.arrCatAfter,this.arrCrqsasBefore,this.arrCrqsasAfter);
    },
    8000);

  }

  downloadExcelStatistic(patients,messwerte,arrCatBefore,arrCatAfter,arrCrqsasBefore,arrCrqsasAfter){
  
    this._excelService.createExcelTrainings(patients,messwerte,arrCatBefore,arrCatAfter,arrCrqsasBefore,arrCrqsasAfter).then(blob=>{
      console.log("BLOOOOOOB")
      saveAs(new Blob([blob]), 'trainingteilnehmer.xlsx');
    })
  }


  createExcelExport(){




  }


  // async functions
  getCrqsasBefore(data){
    let arrCrqsasBefore: any[] = [];
    for (let entry of data){
      // get the crqsas results
      const promise = this._clientService.hasCrqsasBefore(entry.id).toPromise()
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
      const promise = this._clientService.hasCrqsasAfter(entry.id).toPromise()
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
      const promise = this._clientService.hasCatBefore(entry.id).toPromise()
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
      const promise = this._clientService.hasCatAfter(entry.id).toPromise()
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
