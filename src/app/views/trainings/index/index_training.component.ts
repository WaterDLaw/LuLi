import { Component, OnInit } from '@angular/core';
import { Training } from '../../../models/Training';
import { TrainingsService } from '../../../services/trainings.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-index-training',
  templateUrl: './index_training.component.html',
  styleUrls: ['./index_training.component.scss']
})
export class IndexTrainingComponent implements OnInit {

  private trainings: Array<Training>;
  public searchTitleString: string;
  private trainingId;
  modalReference: any;
  closeResult: string;

  constructor(
    private _trainingService: TrainingsService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.getTrainings();
  }

  getTrainings(){
    this._trainingService.getTrainings()
    .subscribe(data =>{
      console.log(data);
      this.trainings = data;
    })
  }

  // Gets all Patients from the server
  deleteTraining(id){
    console.log("Debug");
    console.log(id);
    this._trainingService.deleteTraining(id)
      .then(success => {
        console.log(success);
        // reload the patient if sucessful
        this.getTrainings();
        this.modalReference.close();
        this.trainingId = null;
      })
  }

  openModal(content, trainingId) {
    this.trainingId = trainingId;
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
