import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCatComponent } from './show-cat.component';

describe('ShowCatComponent', () => {
  let component: ShowCatComponent;
  let fixture: ComponentFixture<ShowCatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowCatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
