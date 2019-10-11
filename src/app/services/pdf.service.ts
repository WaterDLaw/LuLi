import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

    return this.http.get('https://arponline.herokuapp.com' + `/api/pdf/Verordnung/${patient_id}` , {responseType: 'blob'});
    //return this.http.get(this.apiurl + `/api/pdf/Verordnung/${patient_id}` , {responseType: 'blob'});
  }

  getEmptyVerordnung(){
    return this.http.get('https://arponline.herokuapp.com' + `/api/pdf/VerordnungEmpty`, {responseType: 'blob'});
    //return this.http.get(this.apiurl + `/api/pdf/VerordnungEmpty`, {responseType: 'blob'});
  }

  uploadTempSignature(file: FormData){
    
    return this.http.post('https://arponline.herokuapp.com' +`/api/pdf/temp_signature`, file)
  }

  createTempSignature(){
    
  }

  uploadTempCharts(file: FormData){
    const token = this._authService.getToken();
    return this.http.post('https://arponline.herokuapp.com' +`/api/pdf/temp_charts`, file)
  }

  // Get the Patientform Verordnung
  getPatientform(patient_id){
    return this.http.get('https://arponline.herokuapp.com' +  `/api/pdf/Patientformular/${patient_id}`, {responseType: 'blob'});
  }

  // Get the Trainingform
  getTrainingform(patient_id){
    return this.http.get('https://arponline.herokuapp.com' +  `/api/pdf/Trainingformular/${patient_id}`, {responseType: 'blob'});
  }

}
