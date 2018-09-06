import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexEntryComponent } from './index-entry.component';

describe('IndexEntryComponent', () => {
  let component: IndexEntryComponent;
  let fixture: ComponentFixture<IndexEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
