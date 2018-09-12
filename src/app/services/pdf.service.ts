import { Injectable } from '@angular/core';
import { RequestOptions, ResponseContentType, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from 'environments/environment';

@Injectable()
export class PdfService {


  private apiurl = environment.apiurl;

  constructor(
    private _authService: AuthService,
    private http: HttpClient
  ) { }

  getVerordnung(patient_id:number){

    // Depending on what you are sending to the server
    // and what the server is sending back

    //const token = this._authService.getToken();

    return this.http.get(this.apiurl + `/api/pdf/Verordnung/${patient_id}` , {responseType: 'blob'});
  }

  getEmptyVerordnung(){
    return this.http.get(this.apiurl + `/api/pdf/VerordnungEmpty`, {responseType: 'blob'});
  }

}
