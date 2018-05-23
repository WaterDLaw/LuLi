import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCrqsasComponent } from './show-crqsas.component';

describe('ShowCrqsasComponent', () => {
  let component: ShowCrqsasComponent;
  let fixture: ComponentFixture<ShowCrqsasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowCrqsasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCrqsasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
