import { Component, OnInit } from '@angular/core';
import { Pneumologist } from '../../../models/pneumologist';
import { Client } from '../../../models/Client';
import { PneumologistService } from '../../../services/pneumologist.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-pneumologist',
  templateUrl: './show-pneumologist.component.html',
  styleUrls: ['./show-pneumologist.component.scss']
})
export class ShowPneumologistComponent implements OnInit {

  pneumologist = {} as Pneumologist;
  patients: Array<Client>;

  constructor(
    private _pneumologistService: PneumologistService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    // Load Pneumologist
    this.getPneumologist(this.route.snapshot.params['id']);

    // Load Patients of this Pneumologist
    this._pneumologistService.getPatients(this.route.snapshot.params['id'])
      .subscribe(data => {
        this.patients = data;
        console.log(data);
      })

  }

  getPneumologist(id){
    this._pneumologistService.getPneumologist(id)
    .subscribe(data => {
      this.pneumologist = data;
      console.log(this.pneumologist);
    })
  }

}
