import { Component, OnInit } from '@angular/core';
import { TrainingsService } from "../../../services/trainings.service";
import { Training } from "../../../models/Training";
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-create-training',
  templateUrl: './create_training.component.html',
  styleUrls: ['./create_training.component.scss']
})
export class CreateTrainingComponent implements OnInit {

  training: Training;
  location: string;
  olten = false;
  // Time
  /*
  private montag_start;
  private montag_end;
  private dienstag_start;
  private dienstag_end;
  private mittwoch_start;
  private mittwoch_end;
  private donnerstag_start;
  private donnerstag_end;
  private freitag_start;
  private freitag_end;
  private samstag_start;
  private samstag_end;
  private sonntag_start;
  private sonntag_end;
*/
  constructor(
    private _trainingsService: TrainingsService,
    private router: Router
  ) { }

  ngOnInit() {

    this.training = {} as Training;
    //this.training.max_anzahl = 10;
    //this.training.max_new = 4;

  }

  onSubmit(){

    //Stringify the json objects
    /*
    this.training.montag_start = JSON.stringify(this.montag_start);
    this.training.montag_end = JSON.stringify(this.montag_end);
    this.training.dienstag_start = JSON.stringify(this.dienstag_start);
    this.training.dienstag_end = JSON.stringify(this.dienstag_end);
    this.training.mittwoch_start = JSON.stringify(this.mittwoch_start);
    this.training.mittwoch_end = JSON.stringify(this.mittwoch_end);
    this.training.donnerstag_start = JSON.stringify(this.donnerstag_start);
    this.training.donnerstag_end = JSON.stringify(this.donnerstag_end);
    this.training.freitag_start = JSON.stringify(this.freitag_start);
    this.training.freitag_end = JSON.stringify(this.freitag_end);
    this.training.samstag_start = JSON.stringify(this.samstag_start);
    this.training.samstag_end = JSON.stringify(this.samstag_end);
    this.training.sonntag_start = JSON.stringify(this.sonntag_start);
    this.training.sonntag_end = JSON.stringify(this.sonntag_end);
    */


    // crate name of title

    let start = new Date(this.training.start.toString().replace('-','/'));
    console.log(start.getMonth()+1);
    this.training.title = this.training.ort + " " + start.getFullYear().toString() + " " + (start.getMonth() + 1).toString(); 

    this._trainingsService.createTraining(this.training)
    .then(
      data => {
        this.router.navigate([`trainings`]);
      }
    )
    .catch(error => console.log(error));
  }

  
}
