import { Component, OnInit } from '@angular/core';
import { GehtestService } from "../../../../services/gehtest.service";
import { ActivatedRoute } from '@angular/router';
import { Gehtest } from "../../../../models/Gehtest";

@Component({
  selector: 'app-show-gehtest',
  templateUrl: './show-gehtest.component.html',
  styleUrls: ['./show-gehtest.component.scss']
})
export class ShowGehtestComponent implements OnInit {

  gehtest: Gehtest;
  gehtest_id: number;
  showForm: boolean;

  constructor(
    private _gehtestService: GehtestService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.showForm = false;
    this.gehtest_id = this.route.snapshot.params['gehtest_id'];
    this._gehtestService.getGehtest(this.gehtest_id)
      .subscribe(data =>{
        this.gehtest = data;
        this.showForm = true;
        console.log(this.gehtest);
      })
  }

}
