import { Component, OnInit } from '@angular/core';
import { Client } from "../../../models/Client";
import { ClientsService } from "../../../services/clients.service";
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  patient: Client;
  showForm: boolean;

  constructor(
    private _clientsService: ClientsService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.showForm = false;
    // Load Client
    this._clientsService.getClient(this.route.snapshot.params['id'])
      .subscribe(data =>{
        console.log(data);
        this.patient = data;
        this.showForm = true;
      })
  }

  onSubmit(){
    this._clientsService.updateClient(this.patient)
    .then(
      data => {
        this.router.navigate(['clients'])
      }
    )
    .catch(error => console.log(error));
    

  }

}
