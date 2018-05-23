import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexFeedbackComponent } from './index-feedback.component';

describe('IndexFeedbackComponent', () => {
  let component: IndexFeedbackComponent;
  let fixture: ComponentFixture<IndexFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
