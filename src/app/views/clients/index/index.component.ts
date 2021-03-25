import { Component, OnInit } from '@angular/core';
import { ClientsService } from "../../../services/clients.service";
import { Client } from "../../../models/Client";
import { subscribeOn } from 'rxjs/operator/subscribeOn';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-index-clients',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  closeResult: string;
  patients: Array<Client>;
  public searchString: string;
  modalReference: any;
  public patientId: number;

  constructor(
    private _clientService: ClientsService,
    private modalService: NgbModal) { }

  ngOnInit() {

   //this.patients$ = this._clientService.getClients();
    this.getClients();

  }
  // Gets all Patients from the server
  deletePatient(id){
    console.log("Debug");
    console.log(id);
    this._clientService.deleteClient(id)
      .then(success => {
        console.log(success);
        // reload the patient if sucessful
        this.getClients();
        this.modalReference.close();
        this.patientId = null;
      })
      .catch(error =>{
        console.log(error);
      }
      )

    
  }

  getClients(){
    this._clientService.getClients()
      .subscribe(data => {
        // Get the body of the response
        //sort patients by dates
        data.sort(function(a,b) { 
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime() 
        });

        this.patients = data;
      
      })

  }

  
  openModal(content, patientId) {
    this.patientId = patientId;
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
