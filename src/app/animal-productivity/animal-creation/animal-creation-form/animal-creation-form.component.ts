import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Animal, AnimalType } from '../../+state/data-access/data-access.model';

@Component({
  selector: 'app-animal-creation-form',
  templateUrl: './animal-creation-form.component.html',
  styleUrls: ['./animal-creation-form.component.scss'],
})
export class AnimalCreationFormComponent {
  @Output()
  addNewAnimal: EventEmitter<Animal> = new EventEmitter();

  @Output()
  cancel: EventEmitter<void> = new EventEmitter();

  formGroup: FormGroup;

  get animalTypes(): string[] {
    return Object.values(AnimalType);
  }

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      type: [null, Validators.required],
      level: [1, Validators.required],
    });
  }

  onSubmit() {
    this.addNewAnimal.emit(this.formGroup.value);
  }

  onCancel() {
    this.cancel.emit();
  }
}
