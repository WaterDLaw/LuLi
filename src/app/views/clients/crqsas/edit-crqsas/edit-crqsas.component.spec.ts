import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCrqsasComponent } from './edit-crqsas.component';

describe('EditCrqsasComponent', () => {
  let component: EditCrqsasComponent;
  let fixture: ComponentFixture<EditCrqsasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCrqsasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCrqsasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
