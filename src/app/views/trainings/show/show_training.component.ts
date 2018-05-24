import { Component, OnInit } from '@angular/core';
import { TrainingsService } from '../../../services/trainings.service';
import { Training } from '../../../models/Training';
import { Client } from '../../../models/Client';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-training',
  templateUrl: './show_training.component.html',
  styleUrls: ['./show_training.component.scss']
})
export class ShowTrainingComponent implements OnInit {

  
  training = {} as Training;
  patients: Array<Client>;

  constructor(
    private _trainingsService: TrainingsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // Load Trainings
    this.getTraining(this.route.snapshot.params['id']);

    // Load Patients of this training
    this._trainingsService.getParticipants(this.route.snapshot.params['id'])
      .subscribe(data =>{
        console.log(data);
        this.patients = data;
        console.log(this.patients);
      })
  }

  getTraining(id){
    this._trainingsService.getTraining(id)
    .subscribe(data => {
      this.training = data;
      console.log(this.training);
    })
  }

}
