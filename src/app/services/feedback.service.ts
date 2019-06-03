import { Injectable } from '@angular/core';
import { Feedback } from "../models/Feedback";
import { Client } from "../models/Client";
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { environment } from 'environments/environment';
import { ActionHistoryService } from './ActionHistory.service';

@Injectable()
export class FeedbackService {

  private apiurl = environment.apiurl;

  constructor(
    private http: HttpClient,
    private router: Router,
    private _authService: AuthService,
    private _actionHistoryService: ActionHistoryService
  ) { }

  // creates a arpfeedback POST
  createFeedback(feedback: Feedback, patient_id: number){

    this._actionHistoryService.createHistoryEntry("Feedback", "create");

    console.log('create feedback');
    const token = this._authService.getToken();
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.post(this.apiurl + '/api/arp_fragebogen?token=' + token, {feedback, patient_id}, {headers: headers})
    .toPromise();
  }
  // updates an arpfeedback PUT
  updateFeedback(feedback: Feedback, patient_id: number){

    this._actionHistoryService.createHistoryEntry("Feedback", "delete");

    console.log('update feedback');
    const token = this._authService.getToken();
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.put(this.apiurl + `/api/arp_fragebogen/${feedback.id}?token=` + token, {feedback, patient_id}, {headers: headers})
    .toPromise();
  }

  // show a feedback GET
  getFeedback(id:number){
    console.log('show feedback');
    const token = this._authService.getToken();
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.get<Feedback>(this.apiurl + `/api/arp_fragebogen/${id}?token=` + token);
  }

  // returns all feedback for future implemantation
  indexFeedback(){

  }

}
