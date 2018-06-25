import { Injectable } from '@angular/core';
import { Crqsas } from "../models/Crqsas";
import { Client } from "../models/Client";
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
@Injectable()
export class CrqsasService {

  private localhost:string = "http://localhost:8000";
  private herokuApi:string = 'https://arponline.herokuapp.com'

  constructor(
    private http: HttpClient,
    private router: Router,
    private _authService: AuthService
  ) { }

   // creates a crqsas POST
   createCrqsas(crqsas: Crqsas, patient_id: number){
    console.log('create crqsas');
    const token = this._authService.getToken();
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.post(this.localhost + '/api/crq_sas?token=' + token, {crqsas, patient_id}, {headers: headers})
    .toPromise();
  }

  // updates an crqsas PUT
  updateCrqsas(crqsas: Crqsas, patient_id: number){
    console.log('update crqsas');
    const token = this._authService.getToken();
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.put(this.localhost + `/api/crq_sas/${crqsas.id}?token=` + token, {crqsas, patient_id}, {headers: headers})
    .toPromise();
  }

  // show a crqsas GET
  getCrqsas(id:number){
    console.log('show crqsas');
    const token = this._authService.getToken();
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.get<Crqsas>(this.localhost + `/api/crq_sas/${id}?token=` + token);
  }

  // returns all crqsas for future implemantation
  indexCrqsas(){

  }

}
