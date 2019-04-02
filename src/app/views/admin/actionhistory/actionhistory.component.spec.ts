import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionhistoryComponent } from './actionhistory.component';

describe('ActionhistoryComponent', () => {
  let component: ActionhistoryComponent;
  let fixture: ComponentFixture<ActionhistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionhistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
