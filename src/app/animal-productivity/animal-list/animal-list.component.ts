import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Animal, TreatType } from '../+state/data-access/data-access.model';

@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.scss'],
})
export class AnimalListComponent {
  @Input()
  animals: Animal[] = [];

  @Output()
  addNewAnimal: EventEmitter<Animal> = new EventEmitter();

  @Output()
  increaseTreatQuantitiy: EventEmitter<{
    type: TreatType;
    animal: Animal;
  }> = new EventEmitter();

  @Output()
  decreaseTreatQuantitiy: EventEmitter<{
    type: TreatType;
    animal: Animal;
  }> = new EventEmitter();

  @Output()
  deleteAnimal: EventEmitter<string> = new EventEmitter();

  addNew: boolean;

  onShowAddNew() {
    this.addNew = true;
  }

  onAddNewAnimal($event: Animal) {
    this.addNewAnimal.emit($event);
    this.addNew = false;
  }

  onCancel() {
    this.addNew = false;
  }

  onIncreaseTreatQuantity($event: TreatType, animal: Animal) {
    this.increaseTreatQuantitiy.emit({ type: $event, animal });
  }

  onDecreaseTreatQuantity($event: TreatType, animal: Animal) {
    this.decreaseTreatQuantitiy.emit({ type: $event, animal });
  }

  onDeleteAnimal(animal: Animal) {
    this.deleteAnimal.emit(animal.id);
  }
}
