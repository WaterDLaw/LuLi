import { Component, OnInit } from '@angular/core';
import { Training } from "../../../models/Training";
import { TrainingsService } from '../../../services/trainings.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-training',
  templateUrl: './edit_training.component.html',
  styleUrls: ['./edit_training.component.scss']
})
export class EditTrainingComponent implements OnInit {

  constructor(
    private _trainingsService: TrainingsService,
    private route: ActivatedRoute
  ) { }

  training: Training;
  showForm: boolean;

  ngOnInit() {
    this.showForm = false;
    // Load Client
    this._trainingsService.getTraining(this.route.snapshot.params['id'])
      .subscribe(data =>{
        this.training = data;
        
        // Change the date values
        this.showForm = true;
      })
  }

  onSubmit(){
    //Strinifigy the time object for the database
    //this.stringifyTrainingTime();
    
    let start = new Date(this.training.start.toString().replace('-','/'));
   
    this.training.title = "Kurs " + (start.getMonth() + 1).toString() + " " + this.training.ort + " " +  start.getFullYear().toString(); 

    this._trainingsService.updateTraining(this.training);
  }

}
