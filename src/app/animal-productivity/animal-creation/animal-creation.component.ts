import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Animal } from '../+state/data-access/data-access.model';

@Component({
  selector: 'app-animal-creation',
  templateUrl: './animal-creation.component.html',
  styleUrls: ['./animal-creation.component.scss'],
})
export class AnimalCreationComponent {
  @Output()
  addNewAnimal: EventEmitter<Animal> = new EventEmitter();

  @Output()
  cancel: EventEmitter<void> = new EventEmitter();

  onAddNewAnimal($event: Animal) {
    this.addNewAnimal.emit($event);
  }

  onCancel() {
    this.cancel.emit();
  }
}
