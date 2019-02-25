import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePneumologistComponent } from './delete-pneumologist.component';

describe('DeletePneumologistComponent', () => {
  let component: DeletePneumologistComponent;
  let fixture: ComponentFixture<DeletePneumologistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletePneumologistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePneumologistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
