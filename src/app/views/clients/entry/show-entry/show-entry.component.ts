import { Component, OnInit, Input } from '@angular/core';
import { Entry } from "../../../../models/Entry";

@Component({
  selector: 'app-show-entry',
  templateUrl: './show-entry.component.html',
  styleUrls: ['./show-entry.component.scss']
})
export class ShowEntryComponent implements OnInit {

  @Input() entry: Entry;

  constructor() { }

  ngOnInit() {
  }

}
