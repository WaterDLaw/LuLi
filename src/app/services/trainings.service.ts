import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Training } from "../models/Training";

import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Client } from '../models/Client';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class TrainingsService {


  constructor(
    private http: HttpClient,
    private router: Router,
    private _authService: AuthService) { 

  }

  // Creates a new training
  createTraining(training: Training): any{
    console.log("create");
    const token = this._authService.getToken();
    
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    this.http.post('http://localhost:8000/api/trainings?token=' + token, training, {headers: headers})
      .toPromise()
      .then(res => console.log(res))
      .catch(error => console.log(error)); 
   
  }
  // Get all trainings INDEX Method returns all patients
  getTrainings(): any{
    console.log("index");
    const token = this._authService.getToken();
    return this.http.get<Training>('http://localhost:8000/api/trainings?token=' + token);
  
  }
  // Get training SHOW Method returns a single training with an id
  getTraining(id){
    console.log("show");
    const token = this._authService.getToken();
    return this.http.get<Training>(`http://localhost:8000/api/trainings/${id}?token=` + token);
  }

  updateTraining(training: Training): any{
    console.log("update");
    const token = this._authService.getToken();
    console.log(training.id);
    console.log(training);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put(`http://localhost:8000/api/trainings/${training.id}?token=` + token, training, {headers: headers} )
    .toPromise()
    .then(res => console.log(res))
    .catch(error => console.log(error)); 
  }

  getParticipants(training_id: number){
    console.log("Get participations");
    const token = this._authService.getToken();
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.get<Array<Client>>(`http://localhost:8000/api/trainings/${training_id}/getParticipants?token=` + token);
  }

}