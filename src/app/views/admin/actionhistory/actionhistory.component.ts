import { Component, OnInit } from '@angular/core';
import { ActionHistoryService } from 'app/services/ActionHistory.service';
import { HistoryEntry } from 'app/models/HistoryEntry';

@Component({
  selector: 'app-actionhistory',
  templateUrl: './actionhistory.component.html',
  styleUrls: ['./actionhistory.component.scss']
})
export class ActionhistoryComponent implements OnInit {


  historyEntries: Array<HistoryEntry>;
  public userId: number;

  constructor(
    private _actionHistoryService: ActionHistoryService) { }

  ngOnInit() {

    this.getAllHistoryEntries();

  }
  


  getAllHistoryEntries(){
    this._actionHistoryService.indexHistoryEntry()
      .subscribe(data => {
        console.log(data);
        this.historyEntries = data;
      })

  }


}
