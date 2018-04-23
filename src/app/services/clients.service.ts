import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Client } from "../models/Client";

import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class ClientsService {


  constructor(
    private http: Http,
    private router: Router) { 

  }

  createClient(patient: Client): any{
    console.log("create");
    this.http.post('http://localhost:8000/api/patients', {patient}).s
   
  }


}
