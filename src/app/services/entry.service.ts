import { Injectable } from '@angular/core';
import { Client } from "../models/Client";
import { Entry } from "../models/Entry";
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { environment } from 'environments/environment';
import { ActionHistoryService } from './ActionHistory.service';

@Injectable()
export class EntryService {

  private apiurl = environment.apiurl;

  constructor(
    private http: HttpClient,
    private router: Router,
    private _authService: AuthService,
    private _actionHistoryService: ActionHistoryService
  ) { }

  // Function to send the entry data to the server for the CREATE method
  createEntry(entry: Entry, patient_id: number, user_id: number){

    this._actionHistoryService.createHistoryEntry("Journal Eintrag", "create");

    console.log("create");
    const token = this._authService.getToken();
    
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.apiurl + '/api/entry?token=' + token, {patient_id, user_id, entry}, {headers: headers})
      .toPromise();

  }

  // Function to retrieve data from a single entry with an id and retrieve it
  showEntry(id: number){
    console.log('show entry');
    const token = this._authService.getToken();
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.get<Entry>(this.apiurl + `/api/entry/${id}?token=` + token);
  }

  // Function returnns all entries of one patient with an id
  getEntriesByPatient(id: number){
    console.log('get entry by patient');
    console.log(id);
    const token = this._authService.getToken();
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.get<Entry[]>(this.apiurl + `/api/patients/${id}/entries?token=` + token);
  }

  // Function updates a specific entry with an id
  updateEntry(){
    this._actionHistoryService.createHistoryEntry("Journal Eintrag", "update");
  }

  // Function deletes a specific entry with an id
  deleteEntry(){
    this._actionHistoryService.createHistoryEntry("Journal Eintrag", "delete");
  }

  // Function to retrieve all entries
  indexEntry(){

  }



}
