import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  private apiurl = environment.apiurl;

  constructor(
    private http: HttpClient,
    private router: Router,
    private _authService: AuthService,
  ) { }


  sendNewPatient(){
    const token = this._authService.getToken();
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(this.apiurl + `/api/mail/newPatient?token=` + token);
  }

  sendNewError(message:any){
    console.log(message);
    const token = this._authService.getToken();
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(this.apiurl + `/api/mail/newError/${message}?token=` + token);
  }


}
