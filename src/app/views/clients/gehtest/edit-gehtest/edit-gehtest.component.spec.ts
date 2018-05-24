import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGehtestComponent } from './edit-gehtest.component';

describe('EditGehtestComponent', () => {
  let component: EditGehtestComponent;
  let fixture: ComponentFixture<EditGehtestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditGehtestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGehtestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
