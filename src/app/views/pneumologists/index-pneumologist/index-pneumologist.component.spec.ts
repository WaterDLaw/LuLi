import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexPneumologistComponent } from './index-pneumologist.component';

describe('IndexPneumologistComponent', () => {
  let component: IndexPneumologistComponent;
  let fixture: ComponentFixture<IndexPneumologistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexPneumologistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexPneumologistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
