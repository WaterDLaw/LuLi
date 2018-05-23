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

  constructor(
    private _catService: CatService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.cat = {} as Cat;
    this.patient_id = this.route.snapshot.params['id'];
  }

  onSubmit(){
    console.log(this.cat);
    this._catService.createCat(this.cat, this.patient_id)
    .then(
      data => {
        this.router.navigate([`clients/show/${this.patient_id}`]);
      }
    )
    .catch(error => console.log(error));
  }
}
