import { Component, OnInit } from '@angular/core';
import { CrqsasService } from '../../../../services/crqsas.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Crqsas } from '../../../../models/Crqsas';

@Component({
  selector: 'app-edit-crqsas',
  templateUrl: './edit-crqsas.component.html',
  styleUrls: ['./edit-crqsas.component.scss']
})
export class EditCrqsasComponent implements OnInit {

  crqsas: Crqsas;
  patient_id: number;
  crqsas_id: number;
  showForm: boolean;

  constructor(
    private _crqsasService: CrqsasService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    this.showForm = false;
    this.patient_id = this.route.snapshot.params['id'];
    this.crqsas_id = this.route.snapshot.params['crqsas_id'];

    this._crqsasService.getCrqsas(this.crqsas_id)
      .subscribe(data =>{
        console.log(data);
        this.crqsas = data;
        this.showForm = true;
      })
  }

  onSubmit(){
    console.log(this.crqsas);
    this._crqsasService.updateCrqsas(this.crqsas, this.patient_id)
    .then(
      data => {
        
        this.router.navigate([`clients/show/${this.patient_id}`]);
      }
    )
    .catch(error => console.log(error)); 
  }

}
