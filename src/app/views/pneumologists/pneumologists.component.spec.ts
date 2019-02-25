import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PneumologistsComponent } from './pneumologists.component';

describe('PneumologistsComponent', () => {
  let component: PneumologistsComponent;
  let fixture: ComponentFixture<PneumologistsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PneumologistsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PneumologistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
