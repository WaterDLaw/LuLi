import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EntryService } from "../../../../services/entry.service";
import { Entry } from '../../../../models/Entry';
import { AuthService } from "../../../../services/auth.service";
import { User } from "../../../../models/User";

@Component({
  selector: 'app-create-entry',
  templateUrl: './create-entry.component.html',
  styleUrls: ['./create-entry.component.scss']
})
export class CreateEntryComponent implements OnInit {

  entry = {} as Entry;
  user_id: number;

  @Input() patient_id: number;
  @Output() created = new EventEmitter<boolean>();


  constructor(
    private _entryService: EntryService,
    private _authService: AuthService
  ) { }

  ngOnInit() {
    console.log("patient id");
    console.log(this.patient_id);
    this._authService.getCurrentUser(localStorage.getItem('email'))
      .subscribe((user) => {
        this.user_id = user[0].id
        console.log(this.user_id);
      })
  }

  createEntry(){
    this._entryService.createEntry(this.entry, this.patient_id, this.user_id)
    .then(data => {
        // Entry succesfuly stored
        console.log(data);

        this.created.emit(true);
        //load all entries
      }
    )
    .catch(error => console.log(error));
  }

  onSubmit(){
    
    this.createEntry();
  }

}
