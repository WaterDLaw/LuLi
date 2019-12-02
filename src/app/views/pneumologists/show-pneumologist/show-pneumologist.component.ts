import { Component, OnInit } from '@angular/core';
import { Pneumologist } from '../../../models/pneumologist';
import { Client } from '../../../models/Client';
import { PneumologistService } from '../../../services/pneumologist.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-pneumologist',
  templateUrl: './show-pneumologist.component.html',
  styleUrls: ['./show-pneumologist.component.scss']
})
export class ShowPneumologistComponent implements OnInit {

  pneumologist = {} as Pneumologist;
  patients: Array<Client>;
  signatureFile: File;
  signature;
  hasSignature: boolean= true;

  constructor(
    private _pneumologistService: PneumologistService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    // Load Pneumologist
    this.getPneumologist(this.route.snapshot.params['id']);

    // Load Patients of this Pneumologist
    this._pneumologistService.getPatients(this.route.snapshot.params['id'])
      .subscribe(data => {
        this.patients = data;
        console.log(data);
      })

  }

  getPneumologist(id){
    this._pneumologistService.getPneumologist(id)
    .subscribe(data => {
      this.pneumologist = data;
      console.log(this.pneumologist);
      if(this.pneumologist.signature != null){
        this.getSignature();
      }
      else{
        this.hasSignature = false;
      }
    })
  }

  
  getSignature(){
    this._pneumologistService.getSignature(this.pneumologist).subscribe(sign =>{
      console.log("lauft");
      var reader = new FileReader();
      reader.readAsDataURL(sign); 
      reader.onload = (_event) => { 
        this.signature = reader.result; 
      }
    })
  }

  onFileSelected(event){
    console.log(event);
    // adds the file to the variable
    this.signatureFile = event.target.files[0];
  }

  uploadSignature(){
    const fd = new FormData();
    console.log(this.signatureFile);
    fd.append('signature', this.signatureFile, this.signatureFile.name);
    //api call to upload signature
    this._pneumologistService.uploadSignature(this.pneumologist, fd)
    .then(
      data => {
        console.log(data);
        this.pneumologist = <Pneumologist>data;
        this.getSignature();
        this.hasSignature = true;
      }
  )
  .catch(error => console.log(error));
  }

}
