import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Crqsas } from '../../../../models/Crqsas';
import { CrqsasService } from '../../../../services/crqsas.service';

@Component({
  selector: 'app-show-crqsas-alt',
  templateUrl: './show-crqsas-alt.component.html',
  styleUrls: ['./show-crqsas-alt.component.scss']
})
export class ShowCrqsasAltComponent implements OnInit {


  crqsas: Crqsas;
  crqsas_id: number;
  showForm: boolean;
  
  constructor(
    private _crqsasService: CrqsasService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.showForm = false;
    this.crqsas_id = this.route.snapshot.params['crqsas_id'];
    this._crqsasService.getCrqsas(this.crqsas_id)
      .subscribe(data =>{
        this.crqsas = data;
        this.showForm = true;
        console.log(this.crqsas);
      })
  }




}
