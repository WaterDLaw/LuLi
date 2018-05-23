import { Component, OnInit } from '@angular/core';
import { GehtestService } from '../../../../services/gehtest.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Gehtest } from '../../../../models/Gehtest';

@Component({
  selector: 'app-edit-gehtest',
  templateUrl: './edit-gehtest.component.html',
  styleUrls: ['./edit-gehtest.component.scss']
})
export class EditGehtestComponent implements OnInit {

  gehtest: Gehtest;
  patient_id: number;
  gehtest_id: number;
  showForm: boolean;

  constructor(
    private _gehtestService: GehtestService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    this.showForm = false;
    this.patient_id = this.route.snapshot.params['id'];
    this.gehtest_id = this.route.snapshot.params['gehtest_id'];

    this._gehtestService.getGehtest(this.gehtest_id)
      .subscribe(data =>{
        console.log("gehtest");
        console.log(data);
        this.gehtest = data;
        this.showForm = true;
      })

  }

  onSubmit(){
    console.log(this.gehtest);
    this._gehtestService.updateGehtest(this.gehtest, this.patient_id)
    .then(
      data => {
        
        this.router.navigate([`clients/show/${this.patient_id}`]);
      }
    )
    .catch(error => console.log(error)); 
  }

}
