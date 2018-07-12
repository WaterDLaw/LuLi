import { Injectable } from '@angular/core';
import { Gehtest } from "../models/Gehtest";
import { Client } from "../models/Client";
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { environment } from 'environments/environment';

@Injectable()
export class StatisticService {

    private apiurl = environment.apiurl;

    constructor(
    private http: HttpClient,
    private router: Router,
    private _authService: AuthService
    ) { }

    getStatisticInfos(){
        
    console.log("Get Statisticinfo");
    const token = this._authService.getToken();
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.get<Array<any>>(this.apiurl + `/api/statistics?token=` + token);

    }


}