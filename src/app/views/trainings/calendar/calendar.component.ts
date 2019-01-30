import { Component, OnInit, Input } from '@angular/core';
import { TrainingsService } from '../../../services/trainings.service';
import { Training } from '../../../models/Training';
import { Router } from '@angular/router';
import { IfObservable } from 'rxjs/observable/IfObservable';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  @Input() location: string;
  constructor(
    private _trainingsService: TrainingsService,
    private _authService: AuthService,
    private router: Router
  ) { }

  arrTraining: any[] = [null,null,null,null,null,null,null,null,null,null,null,null];
  arrCount: any[];
  loaded: boolean = false;
  maxNumber = 12;
  showCalendar: boolean = false;

  jan: number = this.maxNumber;
  feb: number = this.maxNumber;
  marz: number = this.maxNumber;
  apr: number = this.maxNumber;
  mai: number = this.maxNumber;
  jun: number = this.maxNumber;
  jul: number = this.maxNumber;
  aug: number = this.maxNumber;
  sep: number = this.maxNumber;
  okt: number = this.maxNumber;
  nov: number = this.maxNumber;
  dez: number = this.maxNumber;

  ngOnInit() {
    console.log(this.location);
    // only show for the person from that place or if the person has access to both places
    this._authService.getCurrentUser(localStorage.getItem('email'))
    .then(user =>{
      console.log(user);
      console.log(user[0].ort);
      if(user[0].ort == this.location){
        console.log("show calendar true");
        this.showCalendar = true;
      }else if(user[0].ort == "alle"){
        console.log("show calendar true");
        this.showCalendar = true;
      }
    })

    
    //calculate the numbers of participants per month
    this._trainingsService.getParticipantsCalendar()
      .then(succes => {
        console.log(succes)
        this.calculatePatients(succes);
      }).catch(err => {
        console.log(err);
      })

  //Get all the Trainings and match it with the fields
    this._trainingsService.getTrainings()
      .subscribe(data=>{
        this.createRouteArray(data);
        this.loaded = true;
        console.log(data);
      })
    
  }

  routeTraining(id){
    if(this.arrTraining[id] != null){
      this.router.navigate(['trainings', 'show', this.arrTraining[id]]); 
    }
  }

  createRouteArray(arr){
    for(let i = 0; i < arr.length; i++){


      let startMonth = new Date(Date.parse(arr[i].start.replace('-','/','g'))).getMonth();

      switch(startMonth){
        case 0:
          this.arrTraining[0] = arr[i].id;
        break;
    
      case 1:
        this.arrTraining[1] = arr[i].id;
        break;

      case 2:
        this.arrTraining[2] = arr[i].id;  
        break;

      case 3:
        this.arrTraining[3] = arr[i].id;
        break;

      case 4:
        this.arrTraining[4] = arr[i].id;
        break;

      case 5:
        this.arrTraining[5] = arr[i].id;
        break;

      case 6:
        this.arrTraining[6] = arr[i].id;
        break;

      case 7:
        this.arrTraining[7] = arr[i].id;
        break;

      case 8:
        this.arrTraining[8] = arr[i].id;
        break;

      case 9:
        this.arrTraining[9] = arr[i].id;
        break;

      case 10:
        this.arrTraining[10] = arr[i].id;
        break;

      case 11:
        this.arrTraining[11] = arr[i].id;
        break;
      default:
        break;
      }
    }
    console.log(this.arrTraining);
  }

  // Function that filters the array to the location
  filterArrayLocation(arrClients: any[]){
    if(this.location == "Olten"){
      return arrClients.filter(client => client.ort == "KSO")
    }else if(this.location == "Solothurn"){
      return arrClients.filter(client => client.ort == "BSS")
    }
  }

  calculatePatients(arr: any[]){

    let arrClients: any[];
    arrClients = this.filterArrayLocation(arr);
    for (let i = 0; i < arrClients.length; i++) {
    

      //check the date to figure out what months need a count higher
      console.log(arr[i].start)
      console.log(arr[i].end)

      let startMonth = new Date(Date.parse(arr[i].start.replace('-','/','g'))).getMonth();
      console.log(this.jan);
      console.log("start Month: " + startMonth);
      switch (startMonth) {
        case 0:
          this.jan = this.jan - 1;
          this.feb = this.feb - 1;
          this.marz = this.marz - 1;
          break;
      
        case 1:
          this.feb = this.feb - 1;
          this.marz = this.marz - 1;
          this.apr = this.apr - 1;
          break;

        case 2:
          this.marz = this.marz - 1;
          this.apr = this.apr - 1;
          this.mai = this.mai - 1;
          break;

        case 3:
          this.apr = this.apr - 1;
          this.mai = this.mai - 1;
          this.jun = this.jun - 1;
          break;

        case 4:
          this.mai = this.mai - 1;
          this.jun = this.jun - 1;
          this.jul = this.jul - 1;
          break;

        case 5:
          this.jun = this.jun - 1;
          this.jul = this.jul - 1;
          this.aug = this.aug - 1;
          break;

        case 6:
          this.jul = this.jul - 1;
          this.aug = this.aug - 1;
          this.sep = this.sep - 1;
          break;

        case 7:
          this.aug = this.aug - 1;
          this.sep = this.sep - 1;
          this.okt = this.okt - 1;
          break;

        case 8:
          this.sep = this.sep - 1;
          this.okt = this.okt - 1;
          this.nov = this.nov - 1;
          break;

        case 9:
          this.okt = this.okt - 1;
          this.nov = this.nov - 1;
          this.dez = this.dez - 1;
          break;

        case 10:
          this.nov = this.nov - 1;
          this.dez = this.dez - 1;
          this.jan = this.jan - 1;
          break;

        case 11:
          this.dez = this.dez - 1;
          this.jan = this.jan - 1;
          this.feb = this.feb - 1;
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
    if (count <= 12 && count >=8 ) {
      result = true;
    }
    return result;
  }

  isMedium(count:number): boolean{
    let result:boolean = false;
    if (count > 2 && count < 8){
      result = true;
    }
    return result;
  }

  isHigh(count:number):boolean{
    let result:boolean = false;
    if (count <= 2){
      result = true;
    }
    return result;
  }

}
