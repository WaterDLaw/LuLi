import { Component, OnInit } from '@angular/core';
import { FeedbackService } from "../../../../services/feedback.service";
import { ActivatedRoute } from '@angular/router';
import { Feedback } from "../../../../models/Feedback";

@Component({
  selector: 'app-show-feedback',
  templateUrl: './show-feedback.component.html',
  styleUrls: ['./show-feedback.component.scss']
})
export class ShowFeedbackComponent implements OnInit {

  feedback: Feedback;
  feedback_id: number;
  showForm: boolean;
  
  constructor(
    private _feedbackService: FeedbackService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.showForm = false;
    this.feedback_id = this.route.snapshot.params['feedback_id'];
    this._feedbackService.getFeedback(this.feedback_id)
      .subscribe(data =>{
        this.feedback = data;
        this.showForm = true;
        console.log(this.feedback);
      })
  }

}
