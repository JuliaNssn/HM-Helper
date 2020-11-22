import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalCreationComponent } from './animal-creation.component';

describe('AnimalCreationComponent', () => {
  let component: AnimalCreationComponent;
  let fixture: ComponentFixture<AnimalCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimalCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
