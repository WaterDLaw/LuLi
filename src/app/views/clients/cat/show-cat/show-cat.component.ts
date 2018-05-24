import { Component, OnInit } from '@angular/core';
import { CatService } from "../../../../services/cat.service";
import { ActivatedRoute } from '@angular/router';
import { Cat } from "../../../../models/Cat";

@Component({
  selector: 'app-show-cat',
  templateUrl: './show-cat.component.html',
  styleUrls: ['./show-cat.component.scss']
})
export class ShowCatComponent implements OnInit {

  cat: Cat;
  cat_id: number;
  showForm: boolean;

  constructor(
    private _catService: CatService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.showForm = false;
    this.cat_id = this.route.snapshot.params['cat_id'];
    this._catService.getCat(this.cat_id)
      .subscribe(data =>{
        this.cat = data;
        this.showForm = true;
        console.log(this.cat);
      })
  }

}
