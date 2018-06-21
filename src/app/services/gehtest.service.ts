import { Injectable } from '@angular/core';
import { Gehtest } from "../models/Gehtest";
import { Client } from "../models/Client";
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class GehtestService {

  private localhost:string = "http://localhost:8000";
  private herokuApi:string = 'https://arponline.herokuapp.com'

  constructor(
    private http: HttpClient,
    private router: Router,
    private _authService: AuthService
  ) { }

  // creates a gehtest POST
  createGehtest(gehtest: Gehtest, patient_id: number){
    console.log('create gehtest');
    const token = this._authService.getToken();
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.post(this.herokuApi + '/api/gehtest?token=' + token, {gehtest, patient_id}, {headers: headers})
    .toPromise();
  }
  // updates an gehtest PUT
  updateGehtest(gehtest: Gehtest, patient_id: number){
    console.log('update gehtest');
    const token = this._authService.getToken();
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.put(this.herokuApi + `/api/gehtest/${gehtest.id}?token=` + token, {gehtest, patient_id}, {headers: headers})
    .toPromise();
  }

  // show a gehtest GET
  getGehtest(id:number){
    console.log('show gehtest');
    const token = this._authService.getToken();
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.get<Gehtest>(this.herokuApi + `/api/gehtest/${id}?token=` + token);
  }

  // returns all gehtests for future implemantation
  indexGehtest(){

  }

}