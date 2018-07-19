import { Component, OnInit } from '@angular/core';
import { CrqsasService } from '../../../../services/crqsas.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Crqsas } from '../../../../models/Crqsas';

@Component({
  selector: 'app-edit-crqsas',
  templateUrl: './edit-crqsas.component.html',
  styleUrls: ['./edit-crqsas.component.scss']
})
export class EditCrqsasComponent implements OnInit {

  crqsas: Crqsas;
  patient_id: number;
  crqsas_id: number;
  showForm: boolean;

  constructor(
    private _crqsasService: CrqsasService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {



    this.showForm = false;
    this.patient_id = this.route.snapshot.params['id'];
    this.crqsas_id = this.route.snapshot.params['crqsas_id'];

    this._crqsasService.getCrqsas(this.crqsas_id)
      .subscribe(data =>{
        console.log(data);
        this.crqsas = data;
        this.showForm = true;
      })
  }

  onSubmit(){

    this.calculateResults();
    console.log(this.crqsas);
    this._crqsasService.updateCrqsas(this.crqsas, this.patient_id)
    .then(
      data => {
        
        this.router.navigate([`clients/show/${this.patient_id}`]);
      }
    )
    .catch(error => console.log(error)); 
  }

  calculateResults(){

    console.log("start calculating");

    let dyspnoe: number;
    let fatique: number;
    let emotion: number;
    let mastery: number;

    // calculate dyspnoe
    dyspnoe = (+this.crqsas.frage_1 + +this.crqsas.frage_2 + +this.crqsas.frage_3 + +this.crqsas.frage_4 + +this.crqsas.frage_5) / 5;
    this.crqsas.dyspnoe = dyspnoe;
    console.log("dsypnoe: " + dyspnoe);

    // calculate fatique
    fatique =( +this.crqsas.frage_8 + +this.crqsas.frage_11 + +this.crqsas.frage_15 + +this.crqsas.frage_17) / 4;
    this.crqsas.fatique = fatique;
    console.log("fatique" + fatique);

    // calculate emotion
    emotion = (+this.crqsas.frage_6 + +this.crqsas.frage_9 + +this.crqsas.frage_12 + +this.crqsas.frage_14 + +this.crqsas.frage_16 + +this.crqsas.frage_18 + +this.crqsas.frage_20) / 7;
    this.crqsas.emotion = emotion;
    console.log("emotion" + fatique);
  
    // calculate mastery
    mastery = (+this.crqsas.frage_7 + +this.crqsas.frage_10 + +this.crqsas.frage_13 + +this.crqsas.frage_19) / 4;
    this.crqsas.mastery = mastery;
    console.log("mastery" + mastery);

  } 

}
