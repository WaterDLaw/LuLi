import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Pneumologist } from '../models/pneumologist';
import { ActionHistoryService } from './ActionHistory.service';
import { Client } from 'app/models/Client';

@Injectable()
export class PneumologistService {


  private apiurl = environment.apiurl;

  constructor(
    private http: HttpClient,
    private router: Router,
    private _authService: AuthService,
    private _actionHistoryService: ActionHistoryService) { 

  }

  // Creates a new Pneumologist
  createPneumologist(pneumologist: Pneumologist): any{

    this._actionHistoryService.createHistoryEntry("Pneumologe", "create");

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

    this._actionHistoryService.createHistoryEntry("Pneumologe", "update");

    console.log("update");
    const token = this._authService.getToken();

   
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put(this.apiurl + `/api/pneumologist/${pneumologist.id}?token=` + token, pneumologist, {headers: headers})
    .toPromise();
  }

  // Upload the signature
  uploadSignature(pneumologist: Pneumologist,formData){

    this._actionHistoryService.createHistoryEntry("Pneumologe", "upload Signature");

    console.log("upload Signature");
    const token = this._authService.getToken();

    
    return this.http.post(this.apiurl + `/api/pneumologist/${pneumologist.id}/uploadSignature?token=` + token, formData)
    .toPromise();

  }

  // Check the Password of the Pneumologist
  
  checkPassword(pneumologist: Pneumologist, pneumopassword: string){

    console.log("check the password");
    console.log(pneumopassword)
    const token = this._authService.getToken();

    let params = new HttpParams().set('password' , pneumopassword);

    return this.http.get(this.apiurl+ `/api/pneumologistPassword/${pneumologist.id}?token=` + token, {params:params})
    .toPromise();

  }

  // Delete the Pneumologist
  deletePneumologist(pneumologist_id: number){

    this._actionHistoryService.createHistoryEntry("Pneumologe", "delete");

    console.log("delete Pneumo");
    console.log(pneumologist_id)
    const token = this._authService.getToken();
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.delete(this.apiurl + `/api/pneumologist/${pneumologist_id}?token=` + token, {responseType: 'text'}) 
    .toPromise();
  }
 
  // Get all Clients for the Pneumologist
  getPatients(pneumologist_id:number){
    console.log("pneumo pateints");
    const token = this._authService.getToken();
    return this.http.get<Array<Client>>(this.apiurl + `/api/pneumologist/${pneumologist_id}/getPatients?token=` + token);
  }

  // Update image link to database
  getSignature(pneumologist: Pneumologist){
    console.log("get signature");
    let signature = pneumologist.signature;
    //trim signature for url
    let strArr = signature.split("/")

    const token = this._authService.getToken();
    return this.http.get(this.apiurl + `/api/pneumologistSignature/${strArr[1]}?token=` + token,  {responseType: 'blob'})
  }
  

}
