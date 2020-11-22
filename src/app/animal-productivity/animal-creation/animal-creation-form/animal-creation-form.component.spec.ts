import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalCreationFormComponent } from './animal-creation-form.component';

describe('AnimalCreationFormComponent', () => {
  let component: AnimalCreationFormComponent;
  let fixture: ComponentFixture<AnimalCreationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimalCreationFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalCreationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
