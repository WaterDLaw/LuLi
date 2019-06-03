import { Injectable } from '@angular/core';
import { HistoryEntry } from "../models/HistoryEntry";
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { environment } from 'environments/environment';

@Injectable()
export class ActionHistoryService {

  private apiurl = environment.apiurl;

  constructor(
    private http: HttpClient,
    private _authService: AuthService
  ) { }

  // Function to send the HistoryEntry data to the server for the CREATE method
  createHistoryEntry(topic: string, action: string){
    console.log("create");

    // create specific historyEntry
    let historyEntry = {} as HistoryEntry;
    historyEntry.action = action;
    historyEntry.topic = topic;
    let email = localStorage.getItem('email');
    console.log(historyEntry);
    const token = this._authService.getToken();
    
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.apiurl + '/api/actionhistory?token=' + token, {historyEntry,email}, {headers: headers})
      .toPromise();

  }

  // Function to retrieve data from a single entry with an id and retrieve it
  showHistoryEntry(id: number){
    console.log('show historyentry');
    const token = this._authService.getToken();
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.get<HistoryEntry>(this.apiurl + `/api/actionhistory/${id}?token=` + token);
  }

  // Function updates a specific entry with an id
  updateEntry(){

  }

  // Function deletes a specific entry with an id
  deleteEntry(){

  }

  // Function to retrieve all entries
  indexHistoryEntry(){
    console.log("index");
    const token = this._authService.getToken();
    return this.http.get<HistoryEntry[]>(this.apiurl + '/api/actionhistory?token=' + token);
  }



}
