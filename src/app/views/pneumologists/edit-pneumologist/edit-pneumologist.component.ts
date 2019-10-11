import { Component, OnInit } from '@angular/core';
import { Pneumologist } from '../../../models/pneumologist';
import { PneumologistService } from '../../../services/pneumologist.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-pneumologist',
  templateUrl: './edit-pneumologist.component.html',
  styleUrls: ['./edit-pneumologist.component.scss']
})
export class EditPneumologistComponent implements OnInit {

  pneumologist: Pneumologist;
  showForm: boolean;
  signatureFile: File = null;

  constructor(
    private _pneumologistService: PneumologistService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {

    this.showForm = false;

    // Load Pneumo
    this._pneumologistService.getPneumologist(this.route.snapshot.params['id'])
      .subscribe(data =>{
        this.pneumologist = data;
        this.showForm = true;
      })
  }



  onSubmit(){

    // Due to PHP bug report since 2014... the only way to get the image is send it via Post but define the method as PUT
    // more here... https://github.com/laravel/framework/issues/13457
    //fd.append('_method', 'PUT');

    //console.log(fd);
    this._pneumologistService.updatePneumologist(this.pneumologist )
    .then(
        data => {
          this.router.navigate(['pneumologists'])
        }
    )
    .catch(error => console.log(error));
    

  }

}
