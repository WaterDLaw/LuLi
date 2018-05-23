import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowGehtestComponent } from './show-gehtest.component';

describe('ShowGehtestComponent', () => {
  let component: ShowGehtestComponent;
  let fixture: ComponentFixture<ShowGehtestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowGehtestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowGehtestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
