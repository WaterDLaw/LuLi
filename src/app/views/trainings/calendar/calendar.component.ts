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

  trainings: Training[];
  arrTraining: any[] = [null,null,null,null,null,null,null,null,null,null,null,null];
  arrCount: any[];
  loaded: boolean = false;
  maxNumber = 12;
  showCalendar: boolean = false;

  // Each month represents the course number 1 = Januar 2 = February
  jan: number;
  feb: number;
  marz: number;
  apr: number;
  mai: number;
  jun: number;
  jul: number;
  aug: number;
  sep: number;
  okt: number;
  nov: number;
  dez: number;

  ngOnInit() {

    // Get all trainings
    this._trainingsService.getTrainings()
      .subscribe(data =>{
        this.trainings = data;
        console.log(this.trainings);
      })



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
        // Get all trainings
        this._trainingsService.getTrainings()
        .subscribe(data =>{
          this.trainings = data;
          console.log(this.trainings);
          this.calculatePatients(succes);

        })
        
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

  createRouteArray(arrayTrainings){

    let arr =  this.filterArrayLocation(arrayTrainings)

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


    // Map the trainings max anzahl to the days
    this.trainings.forEach((training) => {
      console.log(training);
      let trainingMonth = new Date(training.start).getMonth()
      console.log(trainingMonth)
      // Check place and location
      if(this.location == "Olten"){
        if(training.ort =="KSO"){
          // Check start date
          switch (trainingMonth){
            case 0:
                console.log("JANUAR");
              this.jan = training.max_anzahl
              console.log(this.jan)
              break;
            case 1:
              this.feb = training.max_anzahl
              console.log(this.feb)
              break;
            case 2:
              this.marz = training.max_anzahl
              console.log(this.marz)
              break;
            case 3:
              this.apr = training.max_anzahl
              console.log(this.apr)
              break;
            case 4:
              this.mai = training.max_anzahl
              console.log(this.mai)
              break;
            case 5:
              this.jun = training.max_anzahl
              console.log(this.jun)
              break;
            case 6:
              this.jul = training.max_anzahl
              console.log(this.jul)
              break;
            case 7:
              this.aug = training.max_anzahl
              console.log(this.aug)
              break;
            case 8:
              this.sep = training.max_anzahl
              console.log(this.sep)
              break;
            case 9:
              this.okt = training.max_anzahl
              console.log(this.okt)
              break;
            case 10:
              this.nov = training.max_anzahl
              console.log(this.nov)
              break;
            case 11:
              this.dez = training.max_anzahl
              console.log(this.dez)
              break;
          }
  
  
        }
      }
      if(this.location == "Solothurn"){
        if(training.ort == "BSS"){
          // Check start date
          switch ((new Date(training.start)).getMonth()){
            case 0:
              this.jan = training.max_anzahl
              console.log("JANUAR");
              console.log(training.max_anzahl)
              console.log(this.jan)
            case 1:
              this.feb = training.max_anzahl
              console.log(this.feb)
            case 2:
              this.marz = training.max_anzahl
              console.log(this.marz)
            case 3:
              this.apr = training.max_anzahl
              console.log(this.apr)
            case 4:
              this.mai = training.max_anzahl
              console.log(this.mai)
            case 5:
              this.jun = training.max_anzahl
              console.log(this.jun)
            case 6:
              this.jul = training.max_anzahl
              console.log(this.jul)
            case 7:
              this.aug = training.max_anzahl
              console.log(this.aug)
            case 8:
              this.sep = training.max_anzahl
              console.log(this.sep)
            case 9:
              this.okt = training.max_anzahl
              console.log(this.okt)
            case 10:
              this.nov = training.max_anzahl
              console.log(this.nov)
            case 11:
              this.dez = training.max_anzahl
              console.log(this.dez)
          }
        }
      }
      
    }); 
    

    for (let i = 0; i < arrClients.length; i++) {
    
      //check the date to figure out what months need a count higher
      console.log(arr[i].start)
      console.log(arr[i].end)

      let startMonth = new Date(Date.parse(arr[i].start.replace('-','/','g'))).getMonth();

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
          console.log("APriol")
          console.log(this.apr)
          this.mai = this.mai - 1;
          console.log("MAI")
          console.log(this.apr)
          this.jun = this.jun - 1;
          console.log("June")
          console.log(this.apr)
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
