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

  // Time
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

  ngOnInit() {
    this.showForm = false;
    // Load Client
    this._trainingsService.getTraining(this.route.snapshot.params['id'])
      .subscribe(data =>{
        this.training = data;
        
        // Change the date values
        //this.parseTrainingTime();
      })
  }

  onSubmit(){
    //Strinifigy the time object for the database
    //this.stringifyTrainingTime();
    
    let start = new Date(this.training.start.toString().replace('-','/'));
   
    this.training.title = "Kurs " + (start.getMonth() + 1).toString() + " " + this.training.ort + " " +  start.getFullYear().toString(); 

    this._trainingsService.updateTraining(this.training);
  }

  // Function for changing the json Date format
  parseTrainingTime(){
    this.montag_start = JSON.parse(this.training.montag_start);
    this.montag_end = JSON.parse(this.training.montag_end);
    this.dienstag_start = JSON.parse(this.training.dienstag_start);
    this.dienstag_end = JSON.parse(this.training.dienstag_end);
    this.mittwoch_start = JSON.parse(this.training.mittwoch_start);
    this.mittwoch_end = JSON.parse(this.training.mittwoch_end);
    this.donnerstag_start = JSON.parse(this.training.donnerstag_start);
    this.donnerstag_end = JSON.parse(this.training.donnerstag_end);
    this.freitag_start = JSON.parse(this.training.freitag_start);
    this.freitag_end = JSON.parse(this.training.freitag_end);
    this.samstag_start = JSON.parse(this.training.samstag_start);
    this.samstag_end = JSON.parse(this.training.samstag_end);
    this.sonntag_start = JSON.parse(this.training.sonntag_start);
    this.sonntag_end = JSON.parse(this.training.sonntag_end);

    this.showForm = true;

    console.log(this.training);
    
  }

  stringifyTrainingTime(){
      //Stringify the json objects
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
  }

}
