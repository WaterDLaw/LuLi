import { Component, OnInit } from '@angular/core';
import { EntryService } from "../../../../services/entry.service";
import { Entry } from '../../../../models/Entry';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-index-entry',
  templateUrl: './index-entry.component.html',
  styleUrls: ['./index-entry.component.scss']
})
export class IndexEntryComponent implements OnInit {

  entries: Entry[]

  constructor(
    private _entryService: EntryService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getEntries(this.route.snapshot.params['id']);
  }

  getEntries(id:number){
    this._entryService.getEntriesByPatient(id)
      .subscribe(data =>{
        

        //sort entries by dates
        data.sort(function(a,b) { 
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime() 
        });
        this.entries = data;
      })
  }




}
