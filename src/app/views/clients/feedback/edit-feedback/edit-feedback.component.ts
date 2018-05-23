import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../../../../services/feedback.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Feedback } from '../../../../models/Feedback';

@Component({
  selector: 'app-edit-feedback',
  templateUrl: './edit-feedback.component.html',
  styleUrls: ['./edit-feedback.component.scss']
})
export class EditFeedbackComponent implements OnInit {

  feedback: Feedback;
  patient_id: number;
  feedback_id: number;
  showForm: boolean;

  constructor(
    private _feedbackService: FeedbackService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.showForm = false;
    this.patient_id = this.route.snapshot.params['id'];
    this.feedback_id = this.route.snapshot.params['feedback_id'];

    this._feedbackService.getFeedback(this.feedback_id)
      .subscribe(data =>{
        console.log(data);
        this.feedback = data;
        this.showForm = true;
      })
  }

  onSubmit(){
    console.log(this.feedback);
    this._feedbackService.updateFeedback(this.feedback, this.patient_id)
    .then(
      data => {
        
        this.router.navigate([`clients/show/${this.patient_id}`]);
      }
    )
    .catch(error => console.log(error));
  }
}
