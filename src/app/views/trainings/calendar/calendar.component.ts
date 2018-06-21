import { Component, OnInit } from '@angular/core';
import { TrainingsService } from '../../../services/trainings.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  constructor(
    private _trainingsService: TrainingsService
  ) { }

  arrCount: any[];

  jan: number = 0;
  feb: number = 0;
  marz: number = 0;
  apr: number = 0;
  mai: number = 0;
  jun: number = 0;
  jul: number = 0;
  aug: number = 0;
  sep: number = 0;
  okt: number = 0;
  nov: number = 0;
  dez: number = 0;

  ngOnInit() {

    //calculate the numbers of participants per month
    this._trainingsService.getParticipantsCalendar()
      .then(succes => {
        console.log(succes)
        this.calculatePatients(succes);
      }).catch(err => {
        console.log(err);
      })

  }

  calculatePatients(arr: any[]){

    for (let i = 0; i < arr.length; i++) {
    

      //check the date to figure out what months need a count higher
      console.log(arr[i].start)
      console.log(arr[i].end)

      let startMonth = new Date(arr[i].start).getMonth();

      
      switch (startMonth) {
        case 0:
          this.jan = this.jan + 1;
          this.feb = this.feb + 1;
          this.marz = this.marz + 1;
          break;
      
        case 1:
          this.feb = this.feb + 1;
          this.marz = this.marz + 1;
          this.apr = this.apr + 1;
          break;

        case 2:
          this.marz = this.marz + 1;
          this.apr = this.apr + 1;
          this.mai = this.mai + 1;
          break;

        case 3:
          this.apr = this.apr + 1;
          this.mai = this.mai + 1;
          this.jun = this.jun + 1;
          break;

        case 4:
          this.mai = this.mai + 1;
          this.jun = this.jun + 1;
          this.jul = this.jul + 1;
          break;

        case 5:
          this.jun = this.jun + 1;
          this.jul = this.jul + 1;
          this.aug = this.aug + 1;
          break;

        case 6:
          this.jul = this.jul + 1;
          this.aug = this.aug + 1;
          this.sep = this.sep + 1;
          break;

        case 7:
          this.aug = this.aug + 1;
          this.sep = this.sep + 1;
          this.okt = this.okt + 1;
          break;

        case 8:
          this.sep = this.sep + 1;
          this.okt = this.okt + 1;
          this.nov = this.nov + 1;
          break;

        case 9:
          this.okt = this.okt + 1;
          this.nov = this.nov + 1;
          this.dez = this.dez + 1;
          break;

        case 10:
          this.nov = this.nov + 1;
          this.dez = this.dez + 1;
          this.jan = this.jan + 1;
          break;

        case 11:
          this.dez = this.dez + 1;
          this.jan = this.jan + 1;
          this.feb = this.feb + 1;
          break;
        default:
          break;
      }

    }

  }

  // ngClass conditionals

  //lightgreen
  isLow(count:number): boolean{
    let result:boolean = false;
    if (count < 7 ) {
      result = true;
    }
    return result;
  }

  isMedium(count:number): boolean{
    let result:boolean = false;
    if (count >= 7 && count < 12){
      result = true;
    }
    return result;
  }

  isHigh(count:number):boolean{
    let result:boolean = false;
    if (count >= 12){
      result = true;
    }
    return result;
  }

}
