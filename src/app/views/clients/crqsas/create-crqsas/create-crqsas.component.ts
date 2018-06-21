import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Crqsas } from '../../../../models/Crqsas';
import { CrqsasService } from '../../../../services/crqsas.service';

@Component({
  selector: 'app-create-crqsas',
  templateUrl: './create-crqsas.component.html',
  styleUrls: ['./create-crqsas.component.scss']
})
export class CreateCrqsasComponent implements OnInit {

  crqsas: Crqsas;
  patient_id: number;
  time: string;

  constructor(
    private _crqsasSerivce: CrqsasService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.crqsas = {} as Crqsas;
    this.patient_id = this.route.snapshot.params['id'];
    this.time = this.route.snapshot.params['time'];
  }

  onSubmit(){
    console.log(this.crqsas);

    if(this.time == "before"){
      this.crqsas.erledigt = "before";
    }else if(this.time == "after"){
      this.crqsas.erledigt = "after";
    }

    this._crqsasSerivce.createCrqsas(this.crqsas, this.patient_id)
    .then(
      data => {
        this.router.navigate([`clients/show/${this.patient_id}`]);
      }
    )
    .catch(error => console.log(error));
  }

}
