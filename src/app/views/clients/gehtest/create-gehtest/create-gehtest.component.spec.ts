import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGehtestComponent } from './create-gehtest.component';

describe('CreateGehtestComponent', () => {
  let component: CreateGehtestComponent;
  let fixture: ComponentFixture<CreateGehtestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateGehtestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGehtestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
