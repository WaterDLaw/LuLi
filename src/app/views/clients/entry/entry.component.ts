import { Component, OnInit, Input } from '@angular/core';

import { Entry } from "../../../models/Entry";


@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {

 
  @Input() entries: Entry[];

  show:boolean = false;
  moreButton:string= "Mehr"

  constructor(
  ) { }

  ngOnInit() {

    console.log("entry load");
    // get all entries for this patient

  }

  showMore(){
    console.log("Show variable");
    console.log(this.show);

    if(this.moreButton == "Mehr"){
      this.moreButton = "Weniger";
      this.show = true;
    }else if(this.moreButton == "Weniger"){
      this.moreButton = "Mehr";
      this.show = false;
    }

  }

}
