import { Component, OnInit } from '@angular/core';
import { CatService } from '../../../../services/cat.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Cat } from '../../../../models/Cat';

@Component({
  selector: 'app-edit-cat',
  templateUrl: './edit-cat.component.html',
  styleUrls: ['./edit-cat.component.scss']
})
export class EditCatComponent implements OnInit {

  cat: Cat;
  patient_id: number;
  cat_id: number;
  showForm: boolean;

  constructor(
    private _catService: CatService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    this.showForm = false;
    this.patient_id = this.route.snapshot.params['id'];
    this.cat_id = this.route.snapshot.params['cat_id'];

    this._catService.getCat(this.cat_id)
      .subscribe(data =>{
        console.log(data);
        this.cat = data;
        this.showForm = true;
      })
  }

  onSubmit(){
    console.log(this.cat);
    this.calculteTotal();
    this._catService.updateCat(this.cat, this.patient_id)
    .then(
      data => {
        
        this.router.navigate([`clients/show/${this.patient_id}`]);
      }
    )
    .catch(error => console.log(error)); 
  }

  // berechnet die gesamtpunktzahl
  calculteTotal(){

    if(!isNaN(Number(this.cat.gesamtpunktzahl)) && isNaN(Number(this.cat.frage_1))){
      console.log("empty");
    }else{
      console.log("calculate Total")
      let gesamt = Number(this.cat.frage_1) + Number(this.cat.frage_2) + Number(this.cat.frage_3) + Number(this.cat.frage_4) + Number(this.cat.frage_5) + Number(this.cat.frage_6) + Number(this.cat.frage_7) + Number(this.cat.frage_8)
      console.log(gesamt);
      this.cat.gesamtpunktzahl = gesamt;
    }
  }

}
