import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexCrqsasComponent } from './index-crqsas.component';

describe('IndexCrqsasComponent', () => {
  let component: IndexCrqsasComponent;
  let fixture: ComponentFixture<IndexCrqsasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexCrqsasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexCrqsasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
