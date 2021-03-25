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

      return (gewicht/(groesse*groesse)).toFixed(1);
  }

  calcFEV1Soll(alter:number,groesse:number, geschlecht:string, fev1wert: number){
    let fev1mid = 0;
    let fev1soll = 0;

    if(geschlecht == "m"){
      fev1mid = 4.3*groesse-0.029*alter-2.49

    }

    if(geschlecht == "w"){
      fev1mid = 3.95*groesse-0.025*alter-2.6

    }
    fev1soll = fev1wert / fev1mid * 100
    return fev1soll.toFixed(1);
  }

  calcFVCSoll(alter:number,groesse:number, geschlecht:string, fvcwert:number){
      let fvcmid = 0;
      let fvcsoll = 0;
      if(geschlecht== "m"){
         fvcmid = (5.76*groesse)-(0.026*alter)-4.34
      }

      if(geschlecht == "w"){
         fvcmid = (4.43*groesse)-(0.026*alter)-2.89
      }
      fvcsoll = fvcwert / fvcmid * 100;
      return fvcsoll.toFixed(1);
  }

  calcFEV1FVC(fev1, fvc){
    return (fev1/fvc*100).toFixed(0) ;
  }

  calcRVTLC(rv,tlc){
    return (rv/tlc*100).toFixed(0);
  }

  calcDistanzSoll(geschlecht, groesse, alter,gewicht){

    let gehtestSoll = 0;
    console.log(groesse);
    console.log(alter);
    console.log(gewicht);
    if(geschlecht == "m"){
        gehtestSoll = 218+((5.14*groesse*100)-(5.32*alter))-(1.8*gewicht);
        console.log(gehtestSoll);
    }

    if(geschlecht == "w"){
        gehtestSoll = 218+((5.14*groesse*100)-5.32*alter)-(1.8*gewicht+51.31);
    }

    return gehtestSoll.toFixed(0) ;
  }

  calcDistanzMeter(geschlecht, groesse, alter, gewicht,meter){
     let gehtestMeter = 0;
     let gehtestSoll = 0;
     
     console.log("METER")
     console.log(meter);
     

     if(geschlecht == "m"){

      gehtestSoll = 218+((5.14*groesse*100)-(5.32*alter))-(1.8*gewicht);
      gehtestMeter = meter / gehtestSoll * 100

      console.log(gehtestMeter)
      console.log(gehtestSoll)
     }

     if(geschlecht == "w"){
      gehtestSoll = 218+((5.14*groesse*100)-5.32*alter)-(1.8*gewicht+51.31);
      gehtestMeter = meter / gehtestSoll * 100
     }
     return gehtestSoll.toFixed(0);
  }

  calcMaxLeistung(geschlecht, groesse,alter){

    let maxLeistungSoll= 0;
    if(geschlecht == "m"){
        maxLeistungSoll = ((2526*groesse-(9.08*alter)-2759)*0.163)
        console.log(maxLeistungSoll)
    }

    if(geschlecht == "w"){
        maxLeistungSoll = ((1266*groesse-(8.27*alter)-940)*0.163)
        console.log(maxLeistungSoll)
    }

    return maxLeistungSoll.toFixed(0);
  }

  calcBodeScore(fev1lsoll, distanzM, mmrc, bmi){


        
        let score:number= 0;
         //check Fev
         console.log("FEV");
         console.log(fev1lsoll)
         if (Number(fev1lsoll) > 64){
            score = score + 0

         }else if(fev1lsoll <=64 && fev1lsoll >=50){
            score = score + 1

         }else if(fev1lsoll < 50 && fev1lsoll >= 35){
            score = score + 2

         }else if(fev1lsoll < 35){
            score = score + 3

         }

         console.log("FEV")
         console.log(score);

         // check gehtest
         if(distanzM > 350){
            score = score + 0

         }else if(distanzM <= 350 && distanzM >= 250){
            score = score + 1

         }else if (distanzM <250 && distanzM >= 150){
            score = score + 2

         }else if(distanzM < 150){
            score = score + 3

         }

         console.log("gehtest")
         console.log(score);


         //check mmrc
         if(mmrc == +"1  bei Steigung oder schnellem Laufen ebenerdig"){
            score = score + 0

         }else if(mmrc == "2 Langsamer Laufen als Altersgenossen wegen Dyspnoe, Stop beim Laufen nötig"){
            score = score + 1

         }else if(mmrc == "3 Pause nach 100m"){
            score = score + 2

         }else if(mmrc == "4 Zu starke Atemnot um das Haus zu verlassen, Dyspnoe beim Umziehen"){
            score = score + 3

         }

         console.log("mmrc")
         console.log(score);
         //check bmi
         if(bmi >21){
            score = score + 0

         }else if (bmi <=21){
            score = score + 1
 
         }

        return score;
  }

}