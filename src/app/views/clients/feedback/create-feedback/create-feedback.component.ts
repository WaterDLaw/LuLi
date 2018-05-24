import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../../../../services/feedback.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Feedback } from '../../../../models/Feedback';

@Component({
  selector: 'app-create-feedback',
  templateUrl: './create-feedback.component.html',
  styleUrls: ['./create-feedback.component.scss']
})
export class CreateFeedbackComponent implements OnInit {

  feedback: Feedback;
  patient_id: number;
  
  constructor(
    private _feedbackService: FeedbackService,
    private route: ActivatedRoute,
    private router: Router
  ) { }



  ngOnInit() {

    this.feedback = {} as Feedback;
    this.patient_id = this.route.snapshot.params['id'];
  }

  onSubmit(){
    console.log("submited");
    console.log(this.feedback);
    this._feedbackService.createFeedback(this.feedback, this.patient_id)
      .then(
        data => {
          
          this.router.navigate([`clients/show/${this.patient_id}`]);
        }
      )
      .catch(error => console.log(error));
    }
  }


