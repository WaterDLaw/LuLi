import { Injectable } from '@angular/core';
import { Cat } from "../models/Cat";
import { Client } from "../models/Client";
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { environment } from 'environments/environment';
import { ActionHistoryService } from './ActionHistory.service';
@Injectable()
export class CatService {


  private apiurl = environment.apiurl;

  constructor(
    private http: HttpClient,
    private router: Router,
    private _authService: AuthService,
    private _actionHistoryService: ActionHistoryService 
  ) { }

   // creates a cat POST
   createCat(cat: Cat, patient_id: number){

    this._actionHistoryService.createHistoryEntry("Cat", "create");

    console.log('create cat');
    const token = this._authService.getToken();
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.post(this.apiurl + '/api/cat?token=' + token, {cat, patient_id}, {headers: headers})
    .toPromise();
  }

  // updates an cat PUT
  updateCat(cat: Cat, patient_id: number){

    this._actionHistoryService.createHistoryEntry("Cat", "update");

    console.log('update cat');
    const token = this._authService.getToken();
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.put(this.apiurl + `/api/cat/${cat.id}?token=` + token, {cat, patient_id}, {headers: headers})
    .toPromise();
  }

  // show a cat GET
  getCat(id:number){
    console.log('show cat');
    const token = this._authService.getToken();
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.get<Cat>(this.apiurl + `/api/cat/${id}?token=` + token);
  }

  // returns all cat for future implemantation
  indexCat(){

  }

}
