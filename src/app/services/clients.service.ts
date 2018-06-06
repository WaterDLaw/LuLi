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
    return this.http.post('http://localhost:8000/api/patients?token=' + token, patient, {headers: headers})
      .toPromise();
   
  }
  // Get all clients INDEX Method returns all patients
  getClients(): any{
    console.log("index");
    const token = this._authService.getToken();
    return this.http.get<Client>('http://localhost:8000/api/patients?token=' + token);
      
  
  }
  // Get Client SHOW Method returns a single patient with an id
  getClient(id){
    console.log("show");
    const token = this._authService.getToken();
    return this.http.get<Client>(`http://localhost:8000/api/patients/${id}?token=` + token);
  }

  // Update Client 
  updateClient(patient: Client): any{
    console.log("update");
    const token = this._authService.getToken();
    console.log(patient.id);
    console.log(patient);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put(`http://localhost:8000/api/patients/${patient.id}?token=` + token, patient, {headers: headers} )
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
    return this.http.post(`http://localhost:8000/api/patients/addTraining?token=` + token, {patient, training}, {headers: headers} )
    .toPromise();
  }

  //Check if a feedback exists
  hasFeedback(patient_id: number){
    const token = this._authService.getToken();
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<Feedback>(`http://localhost:8000/api/patients/hasFeedback/${patient_id}?token=` + token);
  }

  //Check if a crqsas exists
  hasCrqsas(patient_id: number){
    const token = this._authService.getToken();
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<Crqsas>(`http://localhost:8000/api/patients/hasCrqsas/${patient_id}?token=` + token);
  }

  //Check if a cat exists
  hasCat(patient_id: number){
    const token = this._authService.getToken();
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<Cat>(`http://localhost:8000/api/patients/hasCat/${patient_id}?token=` + token);
  }

  //Check if a gehtest exists
  hasGehtest(patient_id: number){
    const token = this._authService.getToken();
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<Gehtest>(`http://localhost:8000/api/patients/hasGehtest/${patient_id}?token=` + token);
  }

  //gets the feedback of this patient
  getFeedback(patient_id){
    const token = this._authService.getToken();
    return this.http.get<Feedback>(`http://localhost:8000/api/patients/getFeedback/${patient_id}?token=` + token);
  }

}
