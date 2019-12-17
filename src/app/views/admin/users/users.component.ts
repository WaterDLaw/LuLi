import { Component, OnInit } from '@angular/core';
import { UsersService } from "../../../services/users.service";

import { subscribeOn } from 'rxjs/operator/subscribeOn';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../../models/User';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  closeResult: string;
  users: Array<User>;
  public searchString: string;
  modalReference: any;
  public userId: number;

  constructor(
    private _userService: UsersService,
    private modalService: NgbModal) { }

  ngOnInit() {

   //this.patients$ = this._clientService.getClients();
    this.getAllUsers();
    //this.getUsersTestData();
    console.log(this.users);

  }
  // Gets all Patients from the server
  deletePatient(id){
    console.log("Debug");
    console.log(id);
    this._userService.deleteUser(id)
      .then(success => {
        console.log(success);
        // reload the patient if sucessful
        this.getAllUsers();
        this.modalReference.close();
        this.userId = null;
      })
      .catch(error =>{
        console.log(error);
      }
      )

    
  }

  getAllUsers(){
    this._userService.getAllUsers()
      .subscribe(data => {
        console.log(data);
        // Get the body of the response
        this.users = data;
      
      })

  }


  getUsersTestData(){
    this.users = [
      {vorname: "Daniel", name: "Herzog", email:"daniel.herzog.work@outlook.com", userType: 1, id:1},
      {vorname: "Daniela", name: "Herzog", email:"daniel.herzog.work@outlook.com", userType: 2, id:2},
      {vorname: "Danielo", name: "Herzog", email:"daniel.herzog.work@outlook.com", userType: 3, id:3},
      {vorname: "Daniele", name: "Herzog", email:"daniel.herzog.work@outlook.com", userType: 1, id:4},
    ]
  }
  
  openModal(content, userId) {
    this.userId = userId;
    this.modalReference = this.modalService.open(content)
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
