import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { User } from '../models/User';
import { ActionHistoryService } from './ActionHistory.service';

@Injectable()
export class UsersService {


  private apiurl = environment.apiurl;

  constructor(
    private http: HttpClient,
    private router: Router,
    private _authService: AuthService,
    private _actionHistoryService: ActionHistoryService) { 

  }

  // Creates a new User
  createUser(user: User): any{

    this._actionHistoryService.createHistoryEntry("User", "create");

    console.log("create");
    const token = this._authService.getToken();
    
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.post(this.apiurl + '/api/user/register?token=' + token, user, {headers: headers})
      .toPromise();
   
  }
  // Get all users INDEX Method returns all patients
  getAllUsers(): any{
    console.log("index");
    const token = this._authService.getToken();
    return this.http.get<User[]>(this.apiurl + '/api/user/all?token=' + token);
      
  
  }
  // Get USER SHOW Method returns a single patient with an id
  getUser(id){
    console.log("show");
    const token = this._authService.getToken();
    return this.http.get<User>(this.apiurl + `/api/user/${id}?token=` + token);
  }

  // Update Client 
  updateUser(user: User): any{

    this._actionHistoryService.createHistoryEntry("User", "update");

    console.log("update");
    const token = this._authService.getToken();
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put(this.apiurl + `/api/user/${user.id}?token=` + token, user, {headers: headers} )
    .toPromise();
  }

  // Delete the User
  deleteClient(user_id: number){

    this._actionHistoryService.createHistoryEntry("User", "delete");

    console.log("delete User");
    const token = this._authService.getToken();
    return this.http.delete(this.apiurl + `/api/users/${user_id}?token=` + token, {responseType: 'text'}) 
    .toPromise();
  }
}
