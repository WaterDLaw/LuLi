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

  arrTrainingThisYear: any[] = [null,null,null,null,null,null,null,null,null,null,null,null];
  arrTrainingLastYear: any[] = [null,null,null,null,null,null,null,null,null,null,null,null];

  arrNumberThisYear: any[] = [null,null,null,null,null,null,null,null,null,null,null,null];
  arrNumberLastYear: any[] = [null,null,null,null,null,null,null,null,null,null,null,null];
  
  arrMaxNumberThisYear: any[] = [null,null,null,null,null,null,null,null,null,null,null,null];

  arrNewNumberThisYear: any[] = [null,null,null,null,null,null,null,null,null,null,null,null];

  arrAvailable: any[] = [null,null,null,null,null,null,null,null,null,null,null,null];

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
        let participants = succes.filter(patient => patient.status == "Starter");
        console.log(participants)
        this._trainingsService.getTrainings()
        .subscribe(data =>{
          this.trainings = data;
          console.log(this.trainings);
          //this.calculatePatients(participants);
          this.checkPatients(participants);
          if(this.location=="Olten"){
            this.calculateAvailabiltyOlten();
          }
          if(this.location=="Solothurn"){
            this.calculateAvailabiltySolothurn();
          }
          
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

  checkPatients(arr: any[]){

    // Filter by location
    let arrClients: any[];
    arrClients = this.filterArrayLocation(arr);

    let currentYear = (new Date()).getFullYear();
    console.log(currentYear);

    // Sort and check by this year and last year
    arrClients.forEach((client)=>{

      console.log(client.title);
      // split the string (Location, year, month)
      var splitTitle = client.title.split(" ");
      console.log(splitTitle)
      if(splitTitle[1] == currentYear){

        this.arrTrainingThisYear[splitTitle[2]-1] = this.arrTrainingThisYear[splitTitle[2]-1] +1
        console.log(this.arrTrainingThisYear);

      }
      if(splitTitle[1] == currentYear-1){

        this.arrTrainingLastYear[splitTitle[2]-1] = this.arrTrainingLastYear[splitTitle[2]-1] +1
        console.log(this.arrTrainingLastYear);
      }
    })

    // Create the shown number based on 2 rules Max Training and Max new per month
    // The number can never succeed the max training while also not the per month
    // The amount of people participate is based on this month + the last 2    

    // Calculate the number Total Number

    // calculate for each of the training this Year

    this.arrNumberThisYear[0] = this.arrTrainingThisYear[0] +this.arrTrainingLastYear[10] +this.arrTrainingLastYear[11];
    this.arrNumberThisYear[1] = this.arrTrainingThisYear[0] +this.arrTrainingThisYear[1] +this.arrTrainingLastYear[11];
    this.arrNumberThisYear[2] = this.arrTrainingThisYear[0] +this.arrTrainingThisYear[1] +this.arrTrainingThisYear[2];
    this.arrNumberThisYear[3] = this.arrTrainingThisYear[1] +this.arrTrainingThisYear[2] +this.arrTrainingThisYear[3];
    this.arrNumberThisYear[4] = this.arrTrainingThisYear[2] +this.arrTrainingThisYear[3] +this.arrTrainingThisYear[4];
    this.arrNumberThisYear[5] = this.arrTrainingThisYear[3] +this.arrTrainingThisYear[4] +this.arrTrainingThisYear[5];
    this.arrNumberThisYear[6] = this.arrTrainingThisYear[4] +this.arrTrainingThisYear[5] +this.arrTrainingThisYear[6];
    this.arrNumberThisYear[7] = this.arrTrainingThisYear[5] +this.arrTrainingThisYear[6] +this.arrTrainingThisYear[7];
    this.arrNumberThisYear[8] = this.arrTrainingThisYear[6] +this.arrTrainingThisYear[7] +this.arrTrainingThisYear[8];
    this.arrNumberThisYear[9] = this.arrTrainingThisYear[7] +this.arrTrainingThisYear[8] +this.arrTrainingThisYear[9];
    this.arrNumberThisYear[10] = this.arrTrainingThisYear[8] +this.arrTrainingThisYear[9] +this.arrTrainingThisYear[10];
    this.arrNumberThisYear[11] = this.arrTrainingThisYear[9] +this.arrTrainingThisYear[10] +this.arrTrainingThisYear[11];

    console.log(this.arrNumberThisYear);


    // Calculate how much clients are still availabel for this month
    

  }

  calculateAvailabiltyOlten(){

    let currentYear = (new Date()).getFullYear();

    // For each month of the year we have to check the max amount and max new people
    this.trainings.forEach((training)=>{
      if(this.location == "Olten"){
        if(training.ort =="KSO"){
      // Check if the Training is from this year
      // training / place / year / month
      let trainingtitle = training.title.split(" ")

      if(Number(trainingtitle[1]) == currentYear){
        this.arrMaxNumberThisYear[Number(trainingtitle[2])-1] = training.max_anzahl;
        this.arrNewNumberThisYear[Number(trainingtitle[2])-1] = training.max_new;
      } 
    }
  }
    })

    console.log(this.arrMaxNumberThisYear);
    console.log(this.arrNewNumberThisYear);

    // Check if they can get new people this year and then how much is left in total
    for(let i = 0;i<this.arrTrainingThisYear.length; i++){

      let spotleftNew = this.arrNewNumberThisYear[i] - this.arrTrainingThisYear[i];
      console.log(spotleftNew);

      let spotleftMax = this.arrMaxNumberThisYear[i] - this.arrNumberThisYear[i];
      console.log(this.arrMaxNumberThisYear[i])
      console.log(this.arrNumberThisYear[i])
      console.log(spotleftMax);

      // If the spots per training are more than 0 check if that many spots are available if yes take that number if not take the max number



        if(spotleftMax >= spotleftNew){
          this.arrAvailable[i] = spotleftNew;
        }else{
          this.arrAvailable[i] = spotleftMax;
        }


    }

  }

  calculateAvailabiltySolothurn(){
    let currentYear = (new Date()).getFullYear();

    // For each month of the year we have to check the max amount and max new people
    this.trainings.forEach((training)=>{
      if(this.location == "Solothurn"){
        if(training.ort =="BSS"){
      // Check if the Training is from this year
      // training / place / year / month
      let trainingtitle = training.title.split(" ")

      if(Number(trainingtitle[1]) == currentYear){
        this.arrMaxNumberThisYear[Number(trainingtitle[2])-1] = training.max_anzahl;
      } 
    }
  }
    })

    console.log(this.arrMaxNumberThisYear);
  

    // Check if they can get new people this year and then how much is left in total
    for(let i = 0;i<this.arrTrainingThisYear.length; i++){

      let spotleftMax = this.arrMaxNumberThisYear[i] - this.arrNumberThisYear[i];
      console.log(this.arrMaxNumberThisYear[i])
      console.log(this.arrNumberThisYear[i])
      console.log(spotleftMax);

      // If the spots per training are more than 0 check if that many spots are available if yes take that number if not take the max number




      this.arrAvailable[i] = spotleftMax;



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
              
              break;
            case 1:
              this.feb = training.max_anzahl
              
              break;
            case 2:
              this.marz = training.max_anzahl
              
              break;
            case 3:
              this.apr = training.max_anzahl
              
              break;
            case 4:
              this.mai = training.max_anzahl
              
              break;
            case 5:
              this.jun = training.max_anzahl
              
              break;
            case 6:
              this.jul = training.max_anzahl
              
              break;
            case 7:
              this.aug = training.max_anzahl
              
              break;
            case 8:
              this.sep = training.max_anzahl
              
              break;
            case 9:
              this.okt = training.max_anzahl
             
              break;
            case 10:
              this.nov = training.max_anzahl
            
              break;
            case 11:
              this.dez = training.max_anzahl
            
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
            
            case 2:
              this.marz = training.max_anzahl
            
            case 3:
              this.apr = training.max_anzahl
             
            case 4:
              this.mai = training.max_anzahl
            
            case 5:
              this.jun = training.max_anzahl
           
            case 6:
              this.jul = training.max_anzahl
           
            case 7:
              this.aug = training.max_anzahl
           
            case 8:
              this.sep = training.max_anzahl
             
            case 9:
              this.okt = training.max_anzahl
         
            case 10:
              this.nov = training.max_anzahl
         
            case 11:
              this.dez = training.max_anzahl
            
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
