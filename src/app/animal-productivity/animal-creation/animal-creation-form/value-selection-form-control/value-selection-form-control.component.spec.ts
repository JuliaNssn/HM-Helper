import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueSelectionFormControlComponent } from './value-selection-form-control.component';

describe('ValueSelectionFormControlComponent', () => {
  let component: ValueSelectionFormControlComponent;
  let fixture: ComponentFixture<ValueSelectionFormControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValueSelectionFormControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValueSelectionFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
