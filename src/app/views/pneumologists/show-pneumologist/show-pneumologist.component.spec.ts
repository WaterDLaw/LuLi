import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPneumologistComponent } from './show-pneumologist.component';

describe('ShowPneumologistComponent', () => {
  let component: ShowPneumologistComponent;
  let fixture: ComponentFixture<ShowPneumologistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowPneumologistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPneumologistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
