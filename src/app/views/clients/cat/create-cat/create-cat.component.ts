import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Cat } from '../../../../models/Cat';
import { CatService } from '../../../../services/cat.service';

@Component({
  selector: 'app-create-cat',
  templateUrl: './create-cat.component.html',
  styleUrls: ['./create-cat.component.scss']
})
export class CreateCatComponent implements OnInit {

  cat: Cat;
  patient_id: number;
  time: string;

  constructor(
    private _catService: CatService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.cat = {} as Cat;
    this.patient_id = this.route.snapshot.params['id'];
    this.time = this.route.snapshot.params['time'];
  }

  onSubmit(){
    console.log(this.cat);
    if(this.time == "before"){
      this.cat.erledigt = "before";
    }else if(this.time == "after"){
      this.cat.erledigt = "after";
    }

    // Calculate total value
    this.calculteTotal();
    this._catService.createCat(this.cat, this.patient_id)
    .then(
      data => {
        this.router.navigate([`clients/show/${this.patient_id}`]);
      }
    )
    .catch(error => console.log(error));
  }

  // berechnet die gesamtpunktzahl
  calculteTotal(){
    console.log("calculate Total")
    let gesamt = Number(this.cat.frage_1) + Number(this.cat.frage_2) + Number(this.cat.frage_3) + Number(this.cat.frage_4) + Number(this.cat.frage_5) + Number(this.cat.frage_6) + Number(this.cat.frage_7) + Number(this.cat.frage_8)
    console.log(gesamt);
    this.cat.gesamtpunktzahl = gesamt;
  }

}
