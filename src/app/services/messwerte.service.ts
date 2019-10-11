import { Injectable } from '@angular/core';
import { Messwerte } from "../models/Messwerte";
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { environment } from 'environments/environment';
import { ActionHistoryService } from './ActionHistory.service';

@Injectable()
export class MesswerteService {

  private apiurl = environment.apiurl;

  constructor(
    private http: HttpClient,
    private router: Router,
    private _authService: AuthService,
    private _actionHistoryService: ActionHistoryService
  ) { }

  // creates a Messwerte POST
  createMesswerte(patient_id: number){

    this._actionHistoryService.createHistoryEntry("Messwerte", "create");

    console.log('create Messwerte');
    const token = this._authService.getToken();
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.post(this.apiurl + '/api/messwerte?token=' + token, patient_id, {headers: headers})
    .toPromise();
  }
  // updates an Messwerte PUT
  updateMesswerte(messwerte: Messwerte){

    this._actionHistoryService.createHistoryEntry("Messwerte", "update");

    console.log('update Messwerte');
    const token = this._authService.getToken();
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.put(this.apiurl + `/api/messwerte/${messwerte[0].id}?token=` + token, messwerte[0], {headers: headers})
    .toPromise();
  }

  // show a gehtest GET
  getMesswerte(id:number){
    console.log('show Messwerte');
    const token = this._authService.getToken();
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.get<Messwerte>(this.apiurl + `/api/messwerte/${id}?token=` + token);
  }

  // Calculation logic for the fields

  calcBMI(gewicht:number, groesse:number){
      console.log("BMI clac");
      console.log(gewicht);
      console.log(groesse);
      return (gewicht/(groesse*groesse)).toFixed(1);
  }

  calcFEV1Soll(alter:number,groesse:number, geschlecht:string){
    let fev1soll = 0;
    console.log("calcFEV1Soll");
    console.log(alter);
    console.log(groesse);
    console.log(geschlecht);
    if(geschlecht == "m"){
        fev1soll = 4.3*groesse-0.029*alter-2.49
        console.log(fev1soll);
    }

    if(geschlecht == "w"){
        fev1soll = 3.95*groesse-0.025*alter-2.6
        console.log(fev1soll);
    }
    return fev1soll.toFixed(2);
  }

  calcFVCSoll(alter:number,groesse:number, geschlecht:string){

      let fvcsoll = 0;
      if(geschlecht== "m"){
         fvcsoll = (5.76*groesse)-(0.026*alter)-4.34
      }

      if(geschlecht == "f"){
         fvcsoll = (4.43*groesse)-(0.026*alter)-2.89
      }
      return fvcsoll.toFixed(2);
  }

  calcFEV1FVC(fev1, fvc){
    return (fev1/fvc).toFixed(0);
  }

  calcRVTLC(rv,tlc){
    return (rv/tlc).toFixed(0);
  }

  calcDistanzSoll(geschlecht, groesse, alter,gewicht){

    let gehtestSoll = 0;
    if(geschlecht == "m"){
        gehtestSoll = (218+(5.14*(groesse*100)-5.32*alter)-(1.8*gewicht))/100;
    }

    if(geschlecht == "w"){
        gehtestSoll = (218+(5.14*(groesse*100)-5.32*alter)-(1.8*gewicht+51.31))/100;
    }

    return gehtestSoll.toFixed(2) ;
  }

  calcMaxLeistung(geschlecht, groesse,alter){

    let maxLeistungSoll= 0;
    if(geschlecht == "m"){
        maxLeistungSoll = ((2526*groesse/100-9.08*alter-2759)*0.163)/100
    }

    if(geschlecht == "w"){
        maxLeistungSoll = ((1266*groesse/100-8.27*alter-940)*0.163)/100
    }

    return maxLeistungSoll.toFixed(2);
  }

  calcBodeScore(fev1lsoll, distanzM, mmrc, bmi){

        console.log("CALC BODE SCORE");
        console.log(fev1lsoll);
        console.log(distanzM);
        console.log(mmrc);
        console.log(bmi);
        
        let score:number= 0;
         //check Fev
         console.log("FEV");
         if (Number(fev1lsoll) > 64){
            score = score + 0
            console.log("+0")
         }else if(fev1lsoll <=64 && fev1lsoll >=50){
            score = score + 1
            console.log("+1")
         }else if(fev1lsoll < 50 && fev1lsoll >= 35){
            score = score + 2
            console.log("+2")
         }else if(fev1lsoll < 35){
            score = score + 3
            console.log("+3")
         }

        console.log("Distanz");
         // check gehtest
         if(distanzM > 350){
            score = score + 0
            console.log("+0")
         }else if(distanzM <= 350 && distanzM >= 250){
            score = score + 1
            console.log("+1")
         }else if (distanzM <250 && distanzM >= 150){
            score = score + 2
            console.log("+2")
         }else if(distanzM < 150){
            score = score + 3
            console.log("+3")
         }

         console.log("mmr");
         //check mmrc
         if(mmrc == +"1  bei Steigung oder schnellem Laufen ebenerdig"){
            score = score + 0
            console.log("+0")
         }else if(mmrc == "2 Langsamer Laufen als Altersgenossen wegen Dyspnoe, Stop beim Laufen nötig"){
            score = score + 1
            console.log("+1")
         }else if(mmrc == "3 Pause nach 100m"){
            score = score + 2
            console.log("+2")
         }else if(mmrc == "4 Zu starke Atemnot um das Haus zu verlassen, Dyspnoe beim Umziehen"){
            score = score + 3
            console.log("+3")
         }

         console.log("Bmi");
         //check bmi
         if(bmi >21){
            score = score + 0
            console.log("+0")
         }else if (bmi <=21){
            score = score + 1
            console.log("+1")
         }

        return score;
  }

}