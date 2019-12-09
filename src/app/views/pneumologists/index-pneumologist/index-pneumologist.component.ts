import { Component, OnInit } from '@angular/core';
import { Pneumologist } from '../../../models/pneumologist';
import { PneumologistService } from '../../../services/pneumologist.service';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-index-pneumologist',
  templateUrl: './index-pneumologist.component.html',
  styleUrls: ['./index-pneumologist.component.scss']
})
export class IndexPneumologistComponent implements OnInit {

  closeResult: string;
  pneumologists: Array<Pneumologist>;
  public searchString: string;
  modalReference: any;
  pneumoid;

  constructor(
    private _pneumologistService: PneumologistService,
    private modalService: NgbModal) { }

  ngOnInit() {

   //this.patients$ = this._clientService.getClients();
    this.getAllPneumos();
    //this.getUsersTestData();
    console.log(this.pneumologists);

  }
  // Gets all Pneumologist from the server
  deletePneumologist(id){
    console.log("Debug");
    console.log(id);
    this._pneumologistService.deletePneumologist(id)
      .then(success => {
        console.log(success);
        // reload the pneumo if sucessful
        this.getAllPneumos();
        this.modalReference.close();
        this.pneumoid = null;
      })
      .catch(error =>{
        console.log(error);
      }
      )

    
  }

  getAllPneumos(){
    this._pneumologistService.getPneumologists()
      .subscribe(data => {
        console.log(data);
        // Get the body of the response
        this.pneumologists = data;
      
      })

  }


  
  openModal(content, pneumoId) {
    this.pneumoid = pneumoId;
    console.log(this.pneumoid)
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
