import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http'; // Debricated soon -> Wechsel auf HttpModule
import { Observable } from 'rxjs';
import { Client } from "../models/Client";
import { Feedback } from "../models/Feedback";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { AuthService } from './auth.service';
import { Training } from '../models/Training';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Crqsas } from '../models/Crqsas';
import { Cat } from '../models/Cat';
import { Gehtest } from '../models/Gehtest';

@Injectable()
export class ClientsService {

  //commit comment
  private localhost:string = "http://localhost:8000";
  private herokuApi:string = 'https://arponline.herokuapp.com'


  constructor(
    private http: HttpClient,
    private router: Router,
    private _authService: AuthService) { 

  }

  // Creates a new Client
  createClient(patient: Client): any{
    console.log("create");
    const token = this._authService.getToken();
    
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.post(this.herokuApi + '/api/patients?token=' + token, patient, {headers: headers})
      .toPromise();
   
  }
  // Get all clients INDEX Method returns all patients
  getClients(): any{
    console.log("index");
    const token = this._authService.getToken();
    return this.http.get<Client>(this.herokuApi + '/api/patients?token=' + token);
      
  
  }
  // Get Client SHOW Method returns a single patient with an id
  getClient(id){
    console.log("show");
    const token = this._authService.getToken();
    return this.http.get<Client>(this.herokuApi + `/api/patients/${id}?token=` + token);
  }

  // Update Client 
  updateClient(patient: Client): any{
    console.log("update");
    const token = this._authService.getToken();
    console.log(patient.id);
    console.log(patient);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put(this.herokuApi + `/api/patients/${patient.id}?token=` + token, patient, {headers: headers} )
    .toPromise();
  }

  // Delete the Client
  deleteClient(patient: Client){

  }

  // Add Training to the Client
  addTraining(patient: Client, training: Training){
    console.log("add Training");
    const token = this._authService.getToken();
    console.log(patient);
    console.log(training.id);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.herokuApi + `/api/patients/addTraining?token=` + token, {patient, training}, {headers: headers} )
    .toPromise();
  }

  //Check if a feedback exists
  hasFeedback(patient_id: number){
    const token = this._authService.getToken();
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<Feedback>(this.herokuApi + `/api/patients/hasFeedback/${patient_id}?token=` + token);
  }

  //Check if a crqsas exists
  hasCrqsasBefore(patient_id: number){
    const token = this._authService.getToken();
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<Crqsas>(this.herokuApi + `/api/patients/hasCrqsasBefore/${patient_id}?token=` + token);
  }

  //Check if a crqsas exists
  hasCrqsasAfter(patient_id: number){
    const token = this._authService.getToken();
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<Crqsas>(this.herokuApi + `/api/patients/hasCrqsasAfter/${patient_id}?token=` + token);
  }

  //Check if a cat exists
  hasCatBefore(patient_id: number){
    const token = this._authService.getToken();
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<Cat>(this.herokuApi + `/api/patients/hasCatBefore/${patient_id}?token=` + token);
  }

  //Check if a cat exists
  hasCatAfter(patient_id: number){
    const token = this._authService.getToken();
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<Cat>(this.herokuApi + `/api/patients/hasCatAfter/${patient_id}?token=` + token);
  }

  //Check if a gehtest exists
  hasGehtestBefore(patient_id: number){
    const token = this._authService.getToken();
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<Gehtest>(this.herokuApi + `/api/patients/hasGehtestBefore/${patient_id}?token=` + token);
  }

  //Check if a gehtest after exists
  hasGehtestAfter(patient_id: number){
    const token = this._authService.getToken();
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<Gehtest>(this.herokuApi + `/api/patients/hasGehtestAfter/${patient_id}?token=` + token);
  }
  //gets the feedback of this patient
  getFeedback(patient_id){
    const token = this._authService.getToken();
    return this.http.get<Feedback>(this.herokuApi + `/api/patients/getFeedback/${patient_id}?token=` + token);
  }

}
