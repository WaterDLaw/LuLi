import { Component, OnInit } from '@angular/core';
import { CrqsasService } from "../../../../services/crqsas.service";
import { ActivatedRoute } from '@angular/router';
import { Crqsas } from "../../../../models/Crqsas";

@Component({
  selector: 'app-show-crqsas',
  templateUrl: './show-crqsas.component.html',
  styleUrls: ['./show-crqsas.component.scss']
})
export class ShowCrqsasComponent implements OnInit {

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
