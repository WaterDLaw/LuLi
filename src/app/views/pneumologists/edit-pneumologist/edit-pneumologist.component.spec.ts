import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPneumologistComponent } from './edit-pneumologist.component';

describe('EditPneumologistComponent', () => {
  let component: EditPneumologistComponent;
  let fixture: ComponentFixture<EditPneumologistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPneumologistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPneumologistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
