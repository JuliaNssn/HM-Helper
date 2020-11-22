import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatCounterComponent } from './treat-counter.component';

describe('TreatCounterComponent', () => {
  let component: TreatCounterComponent;
  let fixture: ComponentFixture<TreatCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreatCounterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
