import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from "../../../models/Client";
import { Training } from "../../../models/Training";
import { ClientsService } from "../../../services/clients.service";
import { TrainingsService } from "../../../services/trainings.service";

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  closeResult: string;
  trainings: Array<Training>
  modalReference: any;

  // Reference Variables
  feedback: any;
  crqsas: any;
  cat: any;
  gehtest:any;

  constructor(
    private route: ActivatedRoute,
    private _clientService: ClientsService,
    private modalService: NgbModal,
    private _trainingService: TrainingsService,
    private router: Router) { }

  patient = {} as Client;

  ngOnInit() {
    console.log("Routes");
    console.log('configured routes: ', this.router.config);

    this.getPatient(this.route.snapshot.params['id']);
    // load the Trainings
    this.getTrainings();
    // Check if questionaries exists
    this.checkFeedback(this.route.snapshot.params['id']);
    this.checkCrqsas(this.route.snapshot.params['id']);
    this.checkCat(this.route.snapshot.params['id']);
    this.checkGehtest(this.route.snapshot.params['id']);
  }

  getPatient(id){
    this._clientService.getClient(id)
      .subscribe(data => {
        this.patient = data;
      
      })
  }
  checkFeedback(id){
    this._clientService.hasFeedback(id)
      .subscribe(data => {
        console.log("check Feedback");
        console.log(data);
        this.feedback = data;
      })
  }

  checkCrqsas(id){
    this._clientService.hasCrqsas(id)
      .subscribe(data => {
        console.log("check Crq");
        console.log(data);
        this.crqsas = data;
      })
  }

  checkCat(id){
    this._clientService.hasCat(id)
      .subscribe(data => {
        console.log("check Cat");
        console.log(data);
        this.cat = data;
      })
  }

  checkGehtest(id){
    this._clientService.hasGehtest(id)
      .subscribe(data => {
        console.log("check Gehtest");
        console.log(data);
        this.gehtest = data;
      })
  }

  getTrainings(){
    this._trainingService.getTrainings()
      .subscribe(data =>{
        console.log(data);
        this.trainings = data;
      })
  }

  getTrainingName(id):string{

    let trainingName: string;
    for(var i = 0; i< this.trainings.length; i++){
      if(this.trainings[i].id == id){
        trainingName = this.trainings[i].title;
      }
    }

    return trainingName;
  }

  addTraining(training: Training){
    // adds the training to the patient
    this._clientService.addTraining(this.patient, training)
      .then(data =>{
        //relaod the patients if succesful updated
        this.getPatient(this.route.snapshot.params['id']);
        this.modalReference.close();
      })
  }

  openModal(content) {


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
