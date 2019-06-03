import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Training } from "../models/Training";

import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Client } from '../models/Client';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { ActionHistoryService } from './ActionHistory.service';


@Injectable()
export class TrainingsService {

  private apiurl = environment.apiurl;

  constructor(
    private http: HttpClient,
    private router: Router,
    private _authService: AuthService,
    private _actionHistoryService: ActionHistoryService) { 

  }

  // Creates a new training
  createTraining(training: Training): any{

    // create the Action in the Table
    this._actionHistoryService.createHistoryEntry("Training", "create");

    console.log("create");
    const token = this._authService.getToken();
    
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.post(this.apiurl + '/api/trainings?token=' + token, training, {headers: headers})
      .toPromise();
   
  }
  // Get all trainings INDEX Method returns all trainings
  getTrainings(): any{
    console.log("index");
    const token = this._authService.getToken();
    return this.http.get<Training[]>(this.apiurl + '/api/trainings?token=' + token)

  
  }
  // Get training SHOW Method returns a single training with an id
  getTraining(id){
    console.log("show");
    const token = this._authService.getToken();
    return this.http.get<Training>(this.apiurl + `/api/trainings/${id}?token=` + token);
  }

  updateTraining(training: Training): any{

    // create the Action in the Table
    this._actionHistoryService.createHistoryEntry("Training", "update");

    console.log("update");
    const token = this._authService.getToken();
    console.log(training.id);
    console.log(training);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put(this.apiurl + `/api/trainings/${training.id}?token=` + token, training, {headers: headers} )
    .toPromise();
  }

  deleteTraining(training_id: number){
    console.log("delete Training");
    const token = this._authService.getToken();
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.delete(this.apiurl + `/api/trainings/${training_id}?token=` + token, {responseType: 'text'}) 
    .toPromise();
  }

  getParticipants(training_id: number){
    console.log("Get participations");
    const token = this._authService.getToken();
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.get<Array<Client>>(this.apiurl + `/api/trainings/${training_id}/getParticipants?token=` + token);
  }

  getParticipantsCalendar(){
    console.log("Get participants for Calendar");

    return this.http.get<any>(this.apiurl + `/api/calendar`)
      .toPromise();
  }


}
