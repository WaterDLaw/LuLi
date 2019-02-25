import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePneumologistComponent } from './create-pneumologist.component';

describe('CreatePneumologistComponent', () => {
  let component: CreatePneumologistComponent;
  let fixture: ComponentFixture<CreatePneumologistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePneumologistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePneumologistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
