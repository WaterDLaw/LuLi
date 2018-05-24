import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexGehtestComponent } from './index-gehtest.component';

describe('IndexGehtestComponent', () => {
  let component: IndexGehtestComponent;
  let fixture: ComponentFixture<IndexGehtestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexGehtestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexGehtestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
