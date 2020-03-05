declare var jsPDF: any;

import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from "../../../models/Client";
import { Training } from "../../../models/Training";
import { ClientsService } from "../../../services/clients.service";
import { TrainingsService } from "../../../services/trainings.service";
import { DatePipe } from '@angular/common';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Cat } from '../../../models/Cat';
import { Gehtest } from '../../../models/Gehtest';
import { Crqsas } from '../../../models/Crqsas';
import { CrqsasComponent } from '../crqsas/crqsas.component';
import { EntryService } from '../../../services/entry.service';
import { Entry } from '../../../models/Entry';
import { PdfService } from '../../../services/pdf.service';
import { saveAs } from 'file-saver';
import { Angular5Csv } from 'angular5-csv/dist/Angular5-csv';
import { MesswerteService } from 'app/services/messwerte.service';
import { Messwerte } from 'app/models/Messwerte';
import { PneumologistService } from 'app/services/pneumologist.service';
import { Pneumologist } from 'app/models/pneumologist';
import { strictEqual } from 'assert';

import { Chart } from 'chart.js';
import * as ChartAnnotation from 'chartjs-plugin-annotation';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';



import { CrqsasService } from 'app/services/crqsas.service';
import { ExcelService } from 'app/services/Excel.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {
 
  //Variables for charts
  chartOptionsCrq:any;
  chartLabelsCrq:any;
  chartDataCrq:any;
  barChartColorsCrq:any;
  barChartPlugins:any;

  chartOptionsGeh:any;
  chartLabelsGeh:any;
  chartDataGeh:any;
  barChartColorsGeh:any;

  chartOptionsGehW:any;
  chartLabelsGehW:any;
  chartDataGehW:any;
  barChartColorsGehW:any;

  formDownload: boolean = false;

  measurmentEdit: boolean = false;
  empfehlungenEdit: boolean = false;

  closeResult: string;
  trainings: Array<Training>
  pneumos: Array<Pneumologist>;
  modalReference: any;

  selectedPneumo:any;
  pneumoPassword:any = "";

  // Loading ability
  loading: boolean= false;

  // Reference Variables
  feedback: any;
  crqsasBefore: any;
  catBefore: any;
  gehtestBefore:Gehtest;

  crqsasAfter: any;
  catAfter: any;
  gehtestAfter: Gehtest;

  entries: Entry[];
  messwerte: Messwerte;
  // Subscription references

  trainingSubscription: Subscription;
  feedbackSubscription: Subscription;
  crqsasBeforeSubscription: Subscription;
  crqsasAfterSubscription: Subscription;
  catBeforeSubscription: Subscription;
  catAfterSubscription: Subscription;
  gehtestBeforeSubscription: Subscription;
  gehtestAfterSubscription: Subscription;

  entriesSubscription: Subscription;
  // Entry variables
  entryCreate: boolean = false;

  status_vor:string = "vor";
  status_nach:string = "nach";

  pneumoName:string;

  schweigepflicht:string;

  chart:any;

  constructor(
    private route: ActivatedRoute,
    private _clientService: ClientsService,
    private modalService: NgbModal,
    private _trainingService: TrainingsService,
    private _entryService: EntryService,
    private router: Router,
    private datePipe: DatePipe,
    private _pdfService: PdfService,
    private _messwerteService: MesswerteService,
    private _pneumoService: PneumologistService,
    private _crqsasService: CrqsasService,
    private ngZone: NgZone,
    private _excelService: ExcelService) {

    }

  patient = {} as Client;

  ngOnInit() {
    console.log("Routes");
    console.log('configured routes: ', this.router.config);

    // Add the chart plugin to make the lines over the bars
    Chart.pluginService.register(ChartAnnotation);

    
    this.loadInformation();

    this.checkCalls();
    
  }
  // Cancel subscriptions for performance boost

  ngOnDestroy() {
    //this.entriesSubscription.unsubscribe();
    this.trainingSubscription.unsubscribe();
    this.feedbackSubscription.unsubscribe();
    this.crqsasBeforeSubscription.unsubscribe();
    this.crqsasAfterSubscription.unsubscribe();
    this.catBeforeSubscription.unsubscribe();
    this.catAfterSubscription.unsubscribe();

  }

  
  // Executeds the creation of the excel outside the ngzone
  downloadExcel(){

      this._excelService.createExcelInformation(this.patient,this.messwerte[0],this.catBefore[0],this.catAfter[0],this.crqsasBefore[0],this.crqsasAfter[0],this.getTrainingName(this.patient.training_id)).then(blob=>{
        console.log("BLOOOOOOB")
        saveAs(new Blob([blob]), 'abc.xlsx');
      })

  }

  // this function uses the ExcelJs libary to create an Excel sheet and the there are callbacks outside the NgZone
  async createPatientExcel(){
    
  
  }
  
  async checkCalls(){
    console.log("start async");
    await this.checkFeedback(this.route.snapshot.params['id']);
    // Check if questionaries exists Before
    await this.checkCrqsasBefore(this.route.snapshot.params['id']);
    await this.checkCatBefore(this.route.snapshot.params['id']);
    await this.checkCrqsasAfter(this.route.snapshot.params['id']);
    await this.checkCatAfter(this.route.snapshot.params['id']);

    
  }

  async loadInformation(){
    // get entries
    this.getEntries(this.route.snapshot.params['id']);
    this.getMesswerte(this.route.snapshot.params['id']);

    console.log("GETPATIENTS");
    await this.getPatient(this.route.snapshot.params['id']);
    // get Pneumologen
    console.log("GETPNEUMOS")
    await this.getPneumologen();


    // load the Trainings
    this.getTrainings();
  }

  createEntry(){
    this.entryCreate = !this.entryCreate;
  }

  entryCreated(created:boolean){
    if(created){
      // change the form
      this.createEntry();
      // reload entries
      this.getEntries(this.route.snapshot.params['id']);
    }
  }

  getEntries(id:number){
    this._entryService.getEntriesByPatient(id)
      .subscribe(data =>{
        
        console.log(data);
        // Sort so the newest is first
        data.sort(function(a,b) { 
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime() 
        });
   
        this.entries = data;
      })
  }


  getPneumoname(id:number){
    let hispneumo =  this.pneumos.find(e => e.id == id);
    return hispneumo.anrede + " " + hispneumo.vorname + " " + hispneumo.name
  }

  getPneumologen(){
    this._pneumoService.getPneumologists()
      .subscribe(data =>{
        this.pneumos = data;
        this.pneumoName = this.getPneumoname(this.patient.pneumologist_id);
        console.log(data);
      })
  }

  onChangePneumo(pneumoid){
    console.log(pneumoid);
    this.selectedPneumo = this.pneumos.find(x => x.id == pneumoid);
  }

  async checkPneumoPassword(){
    let checked;
    console.log("check password");
    console.log(this.pneumoPassword);
    checked = await this._pneumoService.checkPassword(this.selectedPneumo, this.pneumoPassword).then(data =>{
      console.log("CHECK PW")
      console.log(data);
      return data;
    }).catch(err =>{
      console.log("CHECK PW ERR") 
      console.log(err);
    })
    console.log(checked);
    return checked;
  }

  async pneumoSelected(){
    // get the file from the signature
    // split string
    let signature;
    console.log("Selected PNEUMO")
    console.log(this.selectedPneumo);
    let checked = await this.checkPneumoPassword();
    console.log(checked);
    if(checked){
      this._pneumoService.getSignature(this.selectedPneumo).subscribe(sign =>{
      
        console.log("lauft");
        var reader = new FileReader();
        reader.readAsDataURL(sign); 
        reader.onload = (_event) => { 
          signature = reader.result; 
          this.createTempSignaturePDF(signature);
        }
      })
    }else{
      alert("Falsches Passwort wurde eingegeben");
    }

   

  }

  // Get the Verordnung PDF
  createTempSignaturePDF(img){
    let doc = new jsPDF();
    doc.addImage(img, 'png',  30, 240, 50, 20);
    var pdf = doc.output('blob');
    const fd = new FormData();
    fd.append('signature', pdf, pdf.name);
    // send the doc to the temporary Signature folder
    this._pdfService.uploadTempSignature(fd).subscribe(data =>{
      console.log(data);
      this.downloadVerordnung();
    })

  }

  // Create temp Charts file
  createTempCharsPDF(){
    let doc = new jsPDF();
  }

  async downloadpdf() {
    console.log(this.crqsasBefore[0])
    if(this.crqsasBefore[0]){
      this.createChartCrq();

    }
  
    this.createGehtestChart();
    this.createGehtestChartW();
    this.loading = true;
    const delay = ms => new Promise(res => setTimeout(res, ms));
    this.formDownload = true;
    await delay(2000);
    // get the `<a>` element from click event
    console.log("Continue");
    var canvasCrq = <HTMLCanvasElement> document.querySelector('#bar-chart-crq');
    var canvasGeh = <HTMLCanvasElement> document.querySelector('#bar-chart-geh');
    var canvasGehW = <HTMLCanvasElement> document.querySelector('#bar-chart-gehW');
    //creates image
    var canvasImgCrq =  canvasCrq.toDataURL("image/png", 1.0);
    var canvasImgGeh = canvasGeh.toDataURL("image/png", 1.0);
    var canvasImgGehW = canvasGehW.toDataURL("image/png", 1.0);

    // set the anchors 'download' attibute (name of the file to be downloaded)
    var doc = new jsPDF();
    doc.addImage(canvasImgCrq, 'png', 10, 220, 100 , 60 );
    doc.addImage(canvasImgGeh, 'png', 120, 220, 30 , 60 );
    doc.addImage(canvasImgGehW, 'png', 160, 220, 30 , 60 );
    
    //doc.save('canvas.pdf');
    var pdf = doc.output('blob');
    const fd = new FormData();
    fd.append('charts', pdf, pdf.name);
    // send the doc to the temporary charts folder
    this.formDownload = false;
    setTimeout(function(){
      
    },2000)
    this._pdfService.uploadTempCharts(fd).subscribe(data =>{
      console.log(data);
      //do the actual download call
      
      this.getPatientFormular();
      
    })
  }

  // Get the Patientform PDF
  getPatientFormular(){
    this._pdfService.getPatientform(this.route.snapshot.params['id']).subscribe(data=>{
      console.log(data);
      this.loading = false;
      saveAs(data, `pdf patientenformular.pdf`);
    })
  }

  // Get Trainingsformular
  getTrainingFormular(){
    this._pdfService.getTrainingform(this.route.snapshot.params['id']).subscribe(data=>{
      console.log(data);
      saveAs(data, `pdf trainingsinformationen.pdf`);
    })
  }

  // get Messwerte

  getMesswerte(patient_id:number){
    this._messwerteService.getMesswerte(patient_id)
      .subscribe(data => {
        this.messwerte = data;
        // Gewicht has apperantly no comma
        this.messwerte[0].gewicht_vor = Math.round((this.messwerte[0].gewicht_vor))
        this.messwerte[0].gewicht_nach = Math.round((this.messwerte[0].gewicht_nach));
        this.messwerte[0].hfmax_vor = Number(this.messwerte[0].hfmax_vor).toFixed(0)
        this.messwerte[0].hfmax_nach = Number(this.messwerte[0].hfmax_nach).toFixed(0)
        this.messwerte[0].O2_Dosis_vor = Number(this.messwerte[0].O2_Dosis_vor).toFixed(0)
        this.messwerte[0].O2_Dosis_nach = Number(this.messwerte[0].O2_Dosis_nach).toFixed(0)
        this.messwerte[0].max_leistungW_vor = Number(this.messwerte[0].max_leistungW_vor).toFixed(0);
        this.messwerte[0].max_leistungW_nach = Number(this.messwerte[0].max_leistungW_nach).toFixed(0);
        this.messwerte[0].phwert_vor = Number(this.messwerte[0].phwert_vor).toFixed(1)
        this.messwerte[0].phwert_nach = Number(this.messwerte[0].phwert_nach).toFixed(1)
        this.messwerte[0].pO2_vor = Number(this.messwerte[0].pO2_vor).toFixed(1)
        this.messwerte[0].pO2_nach = Number(this.messwerte[0].pO2_nach).toFixed(1)
        this.messwerte[0].pC02_vor = Number(this.messwerte[0].pC02_vor).toFixed(1)
        this.messwerte[0].pC02_nach = Number(this.messwerte[0].pC02_nach).toFixed(1)
        this.messwerte[0].rr_syst_vor = Number(this.messwerte[0].rr_syst_vor).toFixed(0);
        this.messwerte[0].rr_syst_nach = Number(this.messwerte[0].rr_syst_nach).toFixed(0);
        this.messwerte[0].rr_diast_vor = Number(this.messwerte[0].rr_diast_vor).toFixed(0);
        this.messwerte[0].rr_diast_nach = Number(this.messwerte[0].rr_diast_nach).toFixed(0);
        console.log("MESSWERTE");
        console.log(data);
        // after the Values are here we can create this chart

      })
  }

  trainingsEmpfehlungenEdit(){
    if(this.empfehlungenEdit){
      this.empfehlungenEdit = false;
    }else if(!this.empfehlungenEdit){
      this.empfehlungenEdit = true;
    }
   
  }
  measurmentsEdit(){
    if(this.measurmentEdit){
      this.measurmentEdit = false;
    }else if(!this.measurmentEdit){
      this.measurmentEdit = true;
    }
  }


  valuechange(event){
    console.log("CHANGE THE DAMN PERCENTAGE")
    console.log(event)
    event = event / 100
    console.log(event)
  
  }

  measurmentsSave(){

    // Umwandlungs Methode
    this.measurementsChange();
    // Save the measurements changed in databse
    console.log(this.messwerte);
        // Divide the sa02 into 100 for percent database value
    //this.messwerte[0].saO2min_vor = this.messwerte[0].saO2min_vor / 100
    //this.messwerte[0].saO2min_nach = this.messwerte[0].saO2min_nach / 100
        
    //this.messwerte[0].saO2_vor = this.messwerte[0].saO2_vor / 100
    //this.messwerte[0].saO2_nach = this.messwerte[0].saO2_nach / 100
    //this.messwerte[0].saO2_vor = Number(this.messwerte[0].saO2_vor) / 100
    //this.messwerte[0].saO2_nach = Number(this.messwerte[0].saO2_nach) / 100
    this._messwerteService.updateMesswerte(this.messwerte)
      .then(success =>{
        console.log(success);
      })
      .catch(err =>{
        console.log(err);
      })

    if(this.measurmentEdit){
      this.measurmentEdit = false;
    }else if(!this.measurmentEdit){
      this.measurmentEdit = true;
    }
  }

  trainingsEmpfehlungenSave(){

    this._clientService.updateClient(this.patient)
      .then(success =>{
        console.log(success);
      })
      .catch(err =>{
        console.log(err);
      })

    if(this.empfehlungenEdit){
      this.empfehlungenEdit = false;
    }else if(!this.empfehlungenEdit){
      this.empfehlungenEdit = true;
    }
    
  }

  // Check if a value is nan if so change it to Null since mysql cannot store Nan
  measurementsChange(){
  



  }

  createGehtestChartW(){
    
    console.log("create chart gehtest");
    let data = [
      this.messwerte[0].max_leistungW_vor,this.messwerte[0].max_leistungW_nach
    ]
    this.chartOptionsGehW= {
      animation: false,
      responsive: false,
      scales : {
        yAxes: [{
           ticks: {
              steps : 10,
              stepSize : 10,
              max : 100,
              min: 0
            }
        }],
      },
      legend: {
        display: false
      },
      title: {
        text: 'Max. Leistung [W]',
        display: true
      },
      plugins: {
        datalabels: {
          anchor: 'end',
          align: 'end',
        }
      },      

    
    };

    this.barChartPlugins = [pluginDataLabels];

    this.chartDataGehW = [
      { data: data}
    ];
    this.barChartColorsGehW = [
      {
        backgroundColor: [
          'grey',
          'blue'
        ]
      }

    ]

    this.chartLabelsGehW = ['vorher', 'nachher'];
  }

  createGehtestChart(){

    console.log("create chart gehtest");
    let data = [
      this.messwerte[0].distanzM_vor,this.messwerte[0].distanzM_nach
    ]
    this.chartOptionsGeh= {
      animation: false,
      responsive: false,
      scales : {
        yAxes: [{
           ticks: {
              steps : 20,
              stepSize : 50,
              max : 500,
              min: 0
            }
        }],
      },
      legend: {
        display: false
      },
      title: {
        text: '6min-Gehtest [m]',
        display: true
      },
      plugins: {
        datalabels: {
          anchor: 'end',
          align: 'end',
        }
      },      

    
    };

    this.barChartPlugins = [pluginDataLabels];

    this.chartDataGeh = [
      { data: data}
    ];
    this.barChartColorsGeh = [
      {
        backgroundColor: [
          'grey',
          'blue'
        ]
      }

    ]

    this.chartLabelsGeh = ['vorher', 'nachher'];
  }

 createChartCrq(){

    console.log("create chart");
    console.log(this.crqsasAfter);
    console.log(this.crqsasAfter[0]);
    // get the data from the server
    let data = [
      (this.crqsasAfter[0].dyspnoe - this.crqsasBefore[0].dyspnoe).toFixed(2),
      (this.crqsasAfter[0].fatique - this.crqsasBefore[0].fatique).toFixed(2), 
      (this.crqsasAfter[0].emotion - this.crqsasBefore[0].emotion).toFixed(2), 
      (this.crqsasAfter[0].mastery - this.crqsasBefore[0].mastery).toFixed(2)
    ]

    

    this.chartOptionsCrq = {
      animation: false,
      responsive: true,
      scales : {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Differenz vorher/nachher'
          },
           ticks: {
              steps : 2,
              stepSize : 0.5,
              max : 7,
              min: -2
            }
        }],
        xAxes: [{
          scaleLabel:{
            display: true,
            labelString: 'Domäne'
          }
        }]
      },
      legend: {
        display: false
      },
      title: {
        text: 'CRQ',
        display: true
      },
      plugins: {
        datalabels: {
          anchor: 'end',
          align: 'end',
        }
      },      
      annotation: {
        annotations: [
          {
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: '0.5',
            borderColor: 'grey',
            borderWidth: 0.5,
            borderDash: [10,5]
          },
          {
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: '-0.5',
            borderColor: 'grey',
            borderWidth: 0.5,
            borderDash: [10,5]
          }

      ],
        drawTime: "afterDraw" // (default)
    }
    };

    this.barChartPlugins = [pluginDataLabels];

    this.chartDataCrq = [
      { data: data}
    ];
    let barColors = [];
    let dataset = this.chartDataCrq[0];
    console.log(dataset.data[0]);
    for(var i = 0; i < dataset.data.length;i++){
      if(dataset.data[i] < 0.5 || dataset.data[i] > -0.5){
        barColors[i] = 'grey';
      }
      if(dataset.data[i] > 0.5){
        barColors[i] = 'green';
      }
      if(dataset.data[i] < -0.5){
        barColors[i] = 'red';
      }
    }
    
    //this.barChartColors[0].backgroundColor = this.colors[this.colorIndex++];
    this.barChartColorsCrq = [
      {
        backgroundColor: [
          barColors[0],
          barColors[1],
          barColors[2],
          barColors[3]
        ]
      }

    ]


    this.chartLabelsCrq = ['Dyspnoe', 'Müdigkeit', 'Geühlslage', 'Bewältigung'];


  }






  getPatient(id){
    this._clientService.getClient(id)
      .subscribe(data => {
        console.log("patient");
        console.log(data);
        this.patient = data;
      
        //schweigepflicht
        if(this.patient.schweigepflicht){
          this.schweigepflicht = "Ausgefüllt"
        }else{
          this.schweigepflicht = "Noch offen"
        }

      })
  }

  calcBMI(gewicht, groesse, status?:string){
    // Check this so it calculates the BMI wihtout showing Nan on aempty values
    if(gewicht != null && groesse != null){
      let bmi = this._messwerteService.calcBMI(Number(gewicht),Number(groesse));
      if(status == "vor"){
  
        this.messwerte[0].bmi_vor = Number(bmi);
      }else if(status == "nach"){
  
        this.messwerte[0].bmi_nach = Number(bmi);
  
      }
      return bmi;
    }

  }

  calcFev1Soll(groesse, geschlecht, status?:string, fev1wert?:number){
    
    let age;
    var diff_ms = Date.now() - new Date(this.patient.geburtsdatum).getTime();
    var age_dt = new Date(diff_ms); 

    age = Math.abs(age_dt.getUTCFullYear() - 1970);
    let fev = this._messwerteService.calcFEV1Soll(age,groesse,geschlecht,fev1wert);

    console.log("FEEEEEEEEV")
    console.log(fev)
    if(status == "vor"){
      
      this.messwerte[0].fev1soll_vor = fev;
    }else if(status == "nach"){
      this.messwerte[0].fev1soll_nach = fev;
    }

    return fev;
  }

  calcFvcSoll(groesse, geschlecht, status?:string, fvcwert?:number){
    let age;
    var diff_ms = Date.now() - new Date(this.patient.geburtsdatum).getTime();
    var age_dt = new Date(diff_ms); 

    age = Math.abs(age_dt.getUTCFullYear() - 1970);
    let fvc = this._messwerteService.calcFVCSoll(age,groesse,geschlecht,fvcwert);
    if(status == "vor"){
      
      this.messwerte[0].fvc_soll_vor = fvc;
    }else if(status == "nach"){
      this.messwerte[0].fvc_soll_nach = fvc;
    }

    return fvc;
  }

  calcFEV1FVC(fev1, fvc,status?:string){
    // Check if there is a value or it will return null
    if(fvc != null && fev1 != null){
      console.log("Beides fev1 und fvc")
      let fevfvc = this._messwerteService.calcFEV1FVC(fev1,fvc);
      if(status == "vor"){
        
        this.messwerte[0].fev1_fvc_vor = fevfvc;
      }else if(status == "nach"){
        this.messwerte[0].fev1_fvc_nach = fevfvc;
      }
      return fevfvc;
    }
  }

  calcRVTLC(rv,tlc,status?:string){
    // Check if there is a value or it will return null
    if(rv != null && tlc != null){
      console.log("beides rv und tlc");
      let rvtlc = this._messwerteService.calcRVTLC(rv,tlc);
      if(status == "vor"){
        
        this.messwerte[0].rv_tlc_vor = rvtlc;
      }else if(status == "nach"){
        this.messwerte[0].rv_tlc_nach = rvtlc;
      }
      return rvtlc;
    }
  }

  calcDistanzSoll(geschlecht,groesse,gewicht, status?:string){
    let age;
    var diff_ms = Date.now() - new Date(this.patient.geburtsdatum).getTime();
    var age_dt = new Date(diff_ms); 

    age = Math.abs(age_dt.getUTCFullYear() - 1970);

    let distanzsoll = this._messwerteService.calcDistanzSoll(geschlecht,groesse,age,gewicht);
    let dsoll;

    if(status == "vor"){
      
      this.messwerte[0].distanzS_vor = this.messwerte[0].distanzM_vor / Number(distanzsoll) *100;
      dsoll = (this.messwerte[0].distanzM_vor / Number(distanzsoll) *100).toFixed(0);
    }else if(status == "nach"){
      this.messwerte[0].distanzS_nach = this.messwerte[0].distanzM_nach / Number(distanzsoll) *100;
      dsoll = (this.messwerte[0].distanzM_nach / Number(distanzsoll) *100).toFixed(0);
    }
    return dsoll;
  }

  calcMaxLeistung(geschlecht,groesse, status?:string){
    let age;
    var diff_ms = Date.now() - new Date(this.patient.geburtsdatum).getTime();
    var age_dt = new Date(diff_ms);

    age = Math.abs(age_dt.getUTCFullYear() - 1970);

    let maxsleistungsoll = this._messwerteService.calcMaxLeistung(geschlecht,groesse,age);
    let mxSoll;
    
    if(status == "vor"){
      
      this.messwerte[0].max_leistungS_vor = this.messwerte[0].max_leistungW_vor / Number(maxsleistungsoll) * 100;
      mxSoll = (this.messwerte[0].max_leistungW_vor / Number(maxsleistungsoll) * 100).toFixed(0);
      console.log("VOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOR")
      console.log(this.messwerte[0].max_leistungS_vor)
      console.log(this.messwerte[0].max_leistungW_vor)
    }else if(status == "nach"){
      this.messwerte[0].max_leistungS_nach = this.messwerte[0].max_leistungW_nach /Number(maxsleistungsoll)* 100;
      mxSoll = (this.messwerte[0].max_leistungW_nach / Number(maxsleistungsoll) * 100).toFixed(0);
      console.log("NAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACh")
      console.log(this.messwerte[0].max_leistungS_nach)
      console.log(this.messwerte[0].max_leistungW_nach)
    }
    //comment
    return mxSoll;    
  }



  calcBodeVor(){
    let bodescore = this._messwerteService.calcBodeScore(this.calcFev1Soll(this.messwerte[0].groesse_vor,this.patient.geschlecht,this.status_vor,this.messwerte[0].fev1l_vor),this.messwerte[0].distanzM_vor,this.messwerte[0].dyspnoe_vor,this.calcBMI(this.messwerte[0].gewicht_vor,this.messwerte[0].groesse_vor));
    this.messwerte[0].bodescore_vor = bodescore;
    return bodescore;
  }

  calcBodeNach(){
    
    let bodescore = this._messwerteService.calcBodeScore(this.calcFev1Soll(this.messwerte[0].groesse_nach,this.patient.geschlecht,this.status_nach,this.messwerte[0].fev1l_nach),this.messwerte[0].distanzM_nach,this.messwerte[0].dyspnoe_nach,this.calcBMI(this.messwerte[0].gewicht_nach,this.messwerte[0].groesse_nach));
    this.messwerte[0].bodescore_nach = bodescore;
    return bodescore;
  }

  csvExport(){

    //apply pipe
    var data = this.patient;
  
    if(data != null){
      var options = { 
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalseparator: '.',
        showLabels: true, 
        showTitle: true,
        useBom: false,
        noDownload: false,
        headers: [
          "Id",
          "Created_at Patient",
          "Updated_at Patient",
          "Vorname",
          "Name",
          "Email",
          "Geburtsdatum",
          "Grösse",
          "Geschlecht",
          "Sprache",
          "Telefonnummer",
          "Strasse",
          "PLZ",
          "Ort",
          "Chronisch obstruktive Lungenkrankheit",
          "Zystische Fibrose",
          "Asthma bronchiale",
          "Interstitielle Lungenkrankheit",
          "Thoraxwand- und Thoraxmuskelerkrankung",
          "Andere Lungenkrankheit",
          "Prä- und postoperative Lungenoperation",
          "Funktionelle Atemstörung ",
          "Diagnose Details",
          "Bemerkungen",
          "Training_id",
          "Status",
          "pneumologistName",
          "pneumologistVorname",
          "Rauchstatus",
          "Created_At Training",
          "Updated_At Training",
          "Titel",
          "Trainingsort",
          "Start",
          "Ende"
        ]
    
  
      }
      new Angular5Csv(data, "ExportPatientARP " + this.patient.vorname + " " + this.patient.name, options);
    }else{
      console.log("Patienten leer");
    }

    
  }


  checkFeedback(id){
    this.feedbackSubscription = this._clientService.hasFeedback(id)
      .subscribe(data => {
        console.log("check Feedback");
        console.log(data);
        this.feedback = data;
      })
  }

  checkCrqsasBefore(id){
    this.crqsasBeforeSubscription = this._clientService.hasCrqsasBefore(id)
      .subscribe(data => {
        console.log("check Crq");
        console.log(data);
        this.crqsasBefore = data;
        return data;
      })
  }

  checkCrqsasAfter(id){
    this.crqsasAfterSubscription = this._clientService.hasCrqsasAfter(id)
      .subscribe(data => {
        console.log("check Crq");
        console.log(data);
        // Now we can create the chart
        this.crqsasAfter = data;
  
      })
  }

  checkCatBefore(id){
    this.catBeforeSubscription = this._clientService.hasCatBefore(id)
      .subscribe(data => {
        console.log("check Cat");
        console.log(data);
        this.catBefore = data;
      })
  }

  checkCatAfter(id){
    this.catAfterSubscription =  this._clientService.hasCatAfter(id)
      .subscribe(data => {
        console.log("check Cat");
        console.log(data);

        this.catAfter = data;
        // Rethink the archtiecture of this call not save to call it on the last api call
   
      })
  }

  checkGehtestBefore(id){
    this.gehtestBeforeSubscription = this._clientService.hasGehtestBefore(id)
      .subscribe(data => {
        console.log("check Gehtest");
        console.log(data);
        this.gehtestBefore = data;
      })
  }

  checkGehtestAfter(id){
    this.gehtestAfterSubscription = this._clientService.hasGehtestAfter(id)
      .subscribe(data => {
        console.log("check Gehtest After");
        console.log(data);
        this.gehtestAfter = data;
      })
  }

  getTrainings(){
    this.trainingSubscription = this._trainingService.getTrainings()
      .subscribe(data =>{
        console.log(data);
        data.sort(function(a,b) { 
          return new Date(b.start).getTime() - new Date(a.start).getTime() 
        });
        this.trainings = data;
      })
  }

  getTrainingName(id):string{

    let trainingName: string;
    for(var i = 0; i< this.trainings.length; i++){
      if(this.trainings[i].id == id){
        trainingName = this.trainings[i].title;
      }
    }

    return trainingName;
  }

  addTraining(training: Training){
    // adds the training to the patient
    this._clientService.addTraining(this.patient, training)
      .then(data =>{
        //relaod the patients if succesful updated
        this.getPatient(this.route.snapshot.params['id']);
        this.modalReference.close();
      })
      .catch(error => {
        console.log(error);
      })
  }

  downloadEmpty(){
    this._pdfService.getEmptyVerordnung()
    .subscribe(data =>{

      console.log("success");
      console.log(data);
      
      saveAs(data, `pdf report.pdf`);
      
 
    })
  }

  downloadVerordnung(){
    console.log("download phsysio");
    console.log(this.patient.id);
    this._pdfService.getVerordnung(this.patient.id)
      .subscribe(data =>{

        console.log("success");
        console.log(data);
        saveAs(data, `pdf Verordnung.pdf`);
      })
  }

  download(){
    var doc = new jsPDF();
    var startY = 20;
      // Add images
  
      // Title
      doc.setFontSize(20);
      doc.text(20,20 + startY, 'Zusammenfassung ambulante pulmonale Rehabilitation');
      // Set Fontzise back to normal
      doc.setFontSize(10);

      // Stammdaten 

      doc.text(20,35+ startY ,"Name:");
      doc.text(40,35+ startY ,this.patient.name);

      // Kursdaten nocheinmal anschauen

      doc.text(20,40+ startY ,"Vorname:");
      doc.text(40,40+ startY ,this.patient.vorname);
      doc.text(20,45+ startY ,"Geschlecht:");
      doc.text(40,45+ startY ,this.patient.geschlecht);
      doc.text(20,50+ startY ,"Geb.datum:");

      
      let d = new Date(this.patient.geburtsdatum.toString().replace('-','/'));
      var showDate = this.datePipe.transform(d, 'dd.MM.yyyy');
      console.log(showDate);

      doc.text(40,50+ startY,showDate);

      doc.text(20,55+ startY, "Diagnose");

      //For each diagnose create a new text
      var posY = 0;
      if(this.patient.asthma_bronchiale){
        doc.text(40,55 +posY + startY, "Asthma bronchiale");
        posY = posY + 5;
      }else if(this.patient.chronisch_obstruktive_Lungenkrankheit){
        doc.text(40,55 +posY + startY, "Chronisch obstruktive Lungenkrankheit");
        posY = posY + 5;   
      }else if(this.patient.funktionelle_atemstoerung){
        doc.text(40,55 +posY + startY, "Funktionelle Atemstörtung");
        posY = posY + 5;  
      }else if(this.patient.interstitielle_lungenkrankheit){
        doc.text(40,55 +posY + startY, "Interstitielle Lungenkrankheit");
        posY = posY + 5;      
      }else if(this.patient.postoperative_lungenoperation){
        doc.text(40, 55 + posY + startY, "Postoperative Lungenporation");
        posY = posY + 5;
      }else if(this.patient.thoraxwand_thoraxmuskelerkrankung){
        doc.text(40,55 + posY + startY, "Thoraxwand Thoraxmuskelerkrankung");
        posY = posY + 5;
      }else if(this.patient.andere_lungenkrankheit){
        doc.text(40,55 + posY + startY, "Andere Lungenkrankheit");
        posY = posY + 5;
      }

      posY = 55 + posY +5 + startY;

      doc.text(20,posY, "Rauchstatus");
      doc.text(40,posY, String(this.patient.rauchstatus));
      
      // Table Gewicht
      posY = posY + 10;
      
      var col = ["Messwert", "vorher", "nachher", "Differenz", "%"];
      var rows = [
        ["Gewicht(kg)", String(this.patient.gewicht_before), String(this.patient.gewicht_after), String(this.patient.gewicht_after - this.patient.gewicht_before), "leer"]
      ];

      //replace all null with 0
      for(let i = 0; i<rows.length; i++){
        if(rows[0][i] == null){
          rows[0][i] = "0";
        }
      }

      //create Margin for taple
      var options = {
        margin: {
          top: 50 +startY
        },
        startY: 70 +startY
      };

      doc.autoTable(col, rows, options);
 
      // Table Messwerte

      var rowsMesswerte = [
        ["FEV (l)", this.patient.fevl_before, this.patient.fevl_after, (this.patient.fevl_after -this.patient.fevl_before), "%"],
        ["FEV %", this.patient.fevp_before,this.patient.fevp_after,(this.patient.fevp_after-this.patient.fevp_before), "%"],
        ["VK max. (l)", this.patient.vkmaxl_before, this.patient.vkmaxl_after,(this.patient.vkmaxl_after-this.patient.vkmaxl_before), "%"],
        ["VK %", this.patient.vkmaxp_before, this.patient.vkmaxp_after, (this.patient.vkmaxp_after-this.patient.vkmaxp_before), "%"],
        ["V0 max. (ml)", this.patient.vo2max_before, this.patient.vo2max_after, (this.patient.vo2max_after-this.patient.vo2max_before), "%"]
      ]

      col = ["Lungenfunktion", "vorher", "nachher", "Differenz", "%"];

      options = {
        margin: {
          top:50 +startY
        },
        startY: 90 +startY
      }; 

      doc.autoTable(col,rowsMesswerte,options);

      // undefined
      let crqsasBefore: Crqsas;
      let crqsasAfter: Crqsas;

      if(this.crqsasBefore[0]){
        crqsasBefore = this.crqsasBefore[0];
      }else{

        // create a fake crqsas with 0 in values
        crqsasBefore = {} as Crqsas;
        crqsasBefore.dyspnoe = 0;
        crqsasBefore.emotion = 0;
        crqsasBefore.fatique = 0;
        crqsasBefore.mastery = 0;
      }

      if(this.crqsasAfter[0]){
        crqsasAfter = this.crqsasAfter[0];

      }else{
        crqsasAfter = {} as Crqsas;
        crqsasAfter.dyspnoe = 0;
        crqsasAfter.emotion = 0;
        crqsasAfter.fatique = 0;
        crqsasAfter.mastery = 0;
      }

      // CRQ
      col = ["CRQ","vorher", "nachher", "Differenz", "%"];
      var rowsCRQ = [
        ["Dyspnoe", String(crqsasBefore.dyspnoe), String(crqsasAfter.dyspnoe), String(crqsasAfter.dyspnoe - crqsasBefore.dyspnoe), String((crqsasBefore.dyspnoe/100*crqsasAfter.dyspnoe)-100) + "%"],
        ["Müdigkeit (Fatique)", String(crqsasBefore.fatique), String(crqsasAfter.fatique), String(crqsasAfter.fatique - crqsasBefore.fatique), String((crqsasBefore.fatique/100*crqsasAfter.fatique)-100) + "%"],
        ["Gefühlslage (Emotion)", String(crqsasBefore.emotion), String(crqsasAfter.emotion), String(crqsasAfter.emotion - crqsasBefore.emotion),  String((crqsasBefore.emotion/100*crqsasAfter.emotion)-100) + "%"],
        ["Dyspnoe (Mastery)", String(crqsasBefore.mastery), String(crqsasAfter.mastery), String(crqsasAfter.mastery - crqsasBefore.mastery), String((crqsasBefore.mastery/100*crqsasAfter.mastery)-100) + "%"],
      ]
      options = {
        margin: {
          top:90 +startY
        },
        startY: 140 +startY
      }; 
      doc.autoTable(col,rowsCRQ,options);

      //Gehtest

      col = ["6 Min. Gehtest", "vorher", "nachher", "Differenz", "%"];

      // undefined
      let gehtestBeforeDistanz;
      let gehtestAfterDistanz;
      
      if(this.gehtestBefore[0]){
        gehtestBeforeDistanz = this.gehtestBefore[0].distanz
      }else{
        gehtestBeforeDistanz = "0"
      }

      if(this.gehtestAfter[0]){
        gehtestAfterDistanz = this.gehtestAfter[0].distanz
      }else{
        gehtestAfterDistanz = "0"
      }

      var rowsDistanz = [
        ["Distanz (m)", String(gehtestBeforeDistanz), String(gehtestAfterDistanz), String(gehtestAfterDistanz-gehtestBeforeDistanz), "leer"],
      ]

      options = {
        margin: {
          top:140 +startY
        },
        startY: 190 +startY
      }; 
      doc.autoTable(col,rowsDistanz,options);

      // Cat
      col = ["CAT", "vorher", "nachher", "Differenz", "%"];

      // undefined
      let catBeforeGesamt;
      let catAfterGesamt;

      if(this.catBefore.gesamtpunktzahl){
        catBeforeGesamt = this.catBefore.gesamtpunktzahl;
      }else{
        catBeforeGesamt = "0"
      }

      if(this.catAfter.gesamtpunktzahl){
        catAfterGesamt = this.catAfter.gesamtpunktzahl;
      }else{
        catAfterGesamt = "0"
      }

      var rowsCat = [
        ["0 < Punktzahl > 40", String(catBeforeGesamt), String(catAfterGesamt), String(catAfterGesamt-catBeforeGesamt), "leer"]
      ]

      options = {
        margin: {
          top:160 +startY
        },
        startY: 210 +startY
      }; 
      doc.autoTable(col,rowsCat,options);

      doc.save('Test.pdf');
  }




  openModal(content) {
    this.modalReference = this.modalService.open(content)
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
