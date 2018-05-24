import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexCatComponent } from './index-cat.component';

describe('IndexCatComponent', () => {
  let component: IndexCatComponent;
  let fixture: ComponentFixture<IndexCatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexCatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
