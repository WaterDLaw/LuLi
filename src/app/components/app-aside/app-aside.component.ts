import { Component } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { MailService } from 'app/services/mail.service';

@Component({
  selector: 'app-aside',
  templateUrl: './app-aside.component.html'
})
export class AppAsideComponent {

  closeResult: string;
  modalReference: any;
  message:any;
  constructor(
    private modalService: NgbModal,
    private _mailService: MailService
  ) { }

  sendError(){
    console.log(this.message);
    this._mailService.sendNewError(this.message)
      .subscribe(data =>{
        console.log(data);
        if(data=="true"||data){
          alert("Nachricht wurde gesendet");
        }
      })
  }

  openModal(content) {
    console.log("OPEN")
    this.modalReference = this.modalService.open(content)
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
