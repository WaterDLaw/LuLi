import { Injectable } from '@angular/core';
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
import { environment } from 'environments/environment';
import { ActionHistoryService } from './ActionHistory.service';

@Injectable()
export class ClientsService {


  private apiurl = environment.apiurl;

  constructor(
    private http: HttpClient,
    private router: Router,
    private _authService: AuthService,
    private _actionHistoryService: ActionHistoryService) { 

  }

  // Creates a new Client
  createClient(patient: Client, trainingAdd: number): any{

    this._actionHistoryService.createHistoryEntry("Patient", "create");

    console.log("create");
    const token = this._authService.getToken();
    
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.post(this.apiurl + '/api/patients?token=' + token, {patient, trainingAdd}, {headers: headers})
      .toPromise();
   
  }
  // Get all clients INDEX Method returns all patients
  getClients(): any{
    console.log("index");
    const token = this._authService.getToken();
    return this.http.get<Client>(this.apiurl + '/api/patients?token=' + token);
      
  
  }
  // Get Client SHOW Method returns a single patient with an id
  getClient(id){
    console.log("show");
    const token = this._authService.getToken();
    return this.http.get<Client>(this.apiurl + `/api/patients/${id}?token=` + token);
  }

  // Update Client 
  updateClient(patient: Client): any{

    this._actionHistoryService.createHistoryEntry("Patient", "update");

    console.log("update");
    const token = this._authService.getToken();
    console.log(patient.id);
    console.log(patient);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put(this.apiurl + `/api/patients/${patient.id}?token=` + token, patient, {headers: headers} )
    .toPromise();
  }

  // Delete the Client
  deleteClient(patient_id: number){

    this._actionHistoryService.createHistoryEntry("Patient", "delete");

    console.log("delete Client");
    const token = this._authService.getToken();
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.delete(this.apiurl + `/api/patients/${patient_id}?token=` + token, {responseType: 'text'}) 
    .toPromise();
  }
 
  // Add Training to the Client
  addTraining(patient: any, training: Training){

    this._actionHistoryService.createHistoryEntry("Patient", "Training zugewiesen");

    console.log("add Training");
    const token = this._authService.getToken();
    console.log(patient);
    console.log(training.id);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.apiurl + `/api/patients/addTraining?token=` + token, {patient, training}, {headers: headers} )
    .toPromise();
  }

  // Removes Client from Training
  removeFromTraining(patient: Client, training: Training){
    this._actionHistoryService.createHistoryEntry("Patient", "Vom Training entfernt");

    console.log("remove from training")
    const token = this._authService.getToken();
    console.log(patient);
    console.log(training.id);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.apiurl + `/api/patients/removeFromTraining?token=` + token, {patient, training}, {headers: headers} )
    .toPromise();
  }

  //Check if a feedback exists
  hasFeedback(patient_id: number){
    const token = this._authService.getToken();
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<Feedback>(this.apiurl + `/api/patients/hasFeedback/${patient_id}?token=` + token);
  }

  //Check if a crqsas exists
  hasCrqsasBefore(patient_id: number){
    const token = this._authService.getToken();
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<Crqsas>(this.apiurl + `/api/patients/hasCrqsasBefore/${patient_id}?token=` + token);
  }

  //Check if a crqsas exists
  hasCrqsasAfter(patient_id: number){
    const token = this._authService.getToken();
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<Crqsas>(this.apiurl + `/api/patients/hasCrqsasAfter/${patient_id}?token=` + token);
  }

  //Check if a cat exists
  hasCatBefore(patient_id: number){
    const token = this._authService.getToken();
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<Cat>(this.apiurl + `/api/patients/hasCatBefore/${patient_id}?token=` + token);
  }

  //Check if a cat exists
  hasCatAfter(patient_id: number){
    const token = this._authService.getToken();
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<Cat>(this.apiurl + `/api/patients/hasCatAfter/${patient_id}?token=` + token);
  }

  //Check if a gehtest exists
  hasGehtestBefore(patient_id: number){
    const token = this._authService.getToken();
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<Gehtest>(this.apiurl + `/api/patients/hasGehtestBefore/${patient_id}?token=` + token);
  }

  //Check if a gehtest after exists
  hasGehtestAfter(patient_id: number){
    const token = this._authService.getToken();
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<Gehtest>(this.apiurl + `/api/patients/hasGehtestAfter/${patient_id}?token=` + token);
  }
  //gets the feedback of this patient
  getFeedback(patient_id){
    const token = this._authService.getToken();
    return this.http.get<Feedback>(this.apiurl + `/api/patients/getFeedback/${patient_id}?token=` + token);
  }

}
