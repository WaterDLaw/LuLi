import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PneumologistService } from '../../../services/pneumologist.service';
import { Pneumologist } from '../../../models/pneumologist';

@Component({
  selector: 'app-create-pneumologist',
  templateUrl: './create-pneumologist.component.html',
  styleUrls: ['./create-pneumologist.component.scss']
})
export class CreatePneumologistComponent implements OnInit {



  pneumologist: Pneumologist;

  constructor(
    private _pneumologistService: PneumologistService,
    private router: Router
  ) { }

  ngOnInit() {

    this.pneumologist = {} as Pneumologist;

  }

  onSubmit(){
    console.log(this.pneumologist);

    this._pneumologistService.createPneumologist(this.pneumologist)
      .then(
        data => {
          console.log(data);
          this.router.navigate(['pneumologists'])
        }
      )
      .catch(error => console.log(error));
    
  }
}
