import { Component, OnInit } from '@angular/core';
import { Training } from '../../../models/Training';
import { TrainingsService } from '../../../services/trainings.service';

@Component({
  selector: 'app-index-training',
  templateUrl: './index_training.component.html',
  styleUrls: ['./index_training.component.scss']
})
export class IndexTrainingComponent implements OnInit {

  private trainings: Array<Training>;
  public searchTitleString: string;

  constructor(
    private _trainingService: TrainingsService
  ) { }

  ngOnInit() {
    this._trainingService.getTrainings()
      .subscribe(data =>{
        console.log(data);
        this.trainings = data;
      })
  }

}
