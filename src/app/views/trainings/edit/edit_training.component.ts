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
        this.showForm = true;
      })
  }

  onSubmit(){
    this._trainingsService.updateTraining(this.training);
  }

}
