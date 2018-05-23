import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrqsasComponent } from './crqsas.component';

describe('CrqsasComponent', () => {
  let component: CrqsasComponent;
  let fixture: ComponentFixture<CrqsasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrqsasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrqsasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
