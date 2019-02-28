import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Pneumologist } from '../models/pneumologist';

@Injectable()
export class PneumologistService {


  private apiurl = environment.apiurl;

  constructor(
    private http: HttpClient,
    private router: Router,
    private _authService: AuthService) { 

  }

  // Creates a new Pneumologist
  createPneumologist(pneumologist: Pneumologist): any{
    console.log("create pneumo");
    const token = this._authService.getToken();
    
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.post(this.apiurl + '/api/pneumologist?token=' + token, pneumologist, {headers: headers})
      .toPromise();
   
  }
  // Get all pneumologists INDEX Method returns all 
  getPneumologists(): any{
    console.log("index");
    const token = this._authService.getToken();
    return this.http.get<Pneumologist>(this.apiurl + '/api/pneumologist?token=' + token);
      
  
  }
  // Get Pneumologists SHOW Method returns a single pneumo with an id
  getPneumologist(id){
    console.log("show");
    const token = this._authService.getToken();
    return this.http.get<Pneumologist>(this.apiurl + `/api/pneumologist/${id}?token=` + token);
  }

  // Update Pneumologist 
  updatePneumologist(pneumologist: Pneumologist): any{
    console.log("update");
    const token = this._authService.getToken();
    console.log(pneumologist.id);
    console.log(pneumologist);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put(this.apiurl + `/api/pneumologist/${pneumologist.id}?token=` + token, pneumologist, {headers: headers} )
    .toPromise();
  }

  // Delete the Pneumologist
  deletePneumologist(pneumologist_id: number){
    console.log("delete Pneumo");
    const token = this._authService.getToken();
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.delete(this.apiurl + `/api/pneumologist/${pneumologist_id}?token=` + token, {responseType: 'text'}) 
    .toPromise();
  }
 
  // Get all Clients for the Pneumologist
  getPatients(pneumologist_id:number){
    console.log("pneumo pateints");
    const token = this._authService.getToken();
    return this.http.get<Array<Pneumologist>>(this.apiurl + `/api/pneumologist/${pneumologist_id}/getPatients?token=` + token);
  }

}
