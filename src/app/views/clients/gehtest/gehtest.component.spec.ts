import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GehtestComponent } from './gehtest.component';

describe('GehtestComponent', () => {
  let component: GehtestComponent;
  let fixture: ComponentFixture<GehtestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GehtestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GehtestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
