import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Gehtest } from '../../../../models/Gehtest';
import { GehtestService } from '../../../../services/gehtest.service';

@Component({
  selector: 'app-create-gehtest',
  templateUrl: './create-gehtest.component.html',
  styleUrls: ['./create-gehtest.component.scss']
})
export class CreateGehtestComponent implements OnInit {

  gehtest: Gehtest;
  patient_id: number;
  time: string;

  constructor(
    private _gehtestService: GehtestService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.gehtest = {} as Gehtest;
    this.patient_id = this.route.snapshot.params['id'];
    this.time = this.route.snapshot.params['time'];
    console.log(this.time);
  }

  onSubmit(){
    console.log(this.gehtest);

    //Set the correct timing in gehtest

    if(this.time == "before"){
      this.gehtest.erledigt = "before"
    }else if(this.time == "after"){
      this.gehtest.erledigt = "after"
    }

    this._gehtestService.createGehtest(this.gehtest, this.patient_id)
    .then(
      data => {
        this.router.navigate([`clients/show/${this.patient_id}`]);
      }
    )
    .catch(error => console.log(error));
  }

}
