import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberIncreaseFormControlComponent } from './number-increase-form-control.component';

describe('NumberIncreaseFormControlComponent', () => {
  let component: NumberIncreaseFormControlComponent;
  let fixture: ComponentFixture<NumberIncreaseFormControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumberIncreaseFormControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberIncreaseFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
