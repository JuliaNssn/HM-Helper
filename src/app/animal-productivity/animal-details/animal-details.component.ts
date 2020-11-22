import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  Animal,
  AnimalType,
  TreatType,
} from '../+state/data-access/data-access.model';
@Component({
  selector: 'app-animal-details',
  templateUrl: './animal-details.component.html',
  styleUrls: ['./animal-details.component.scss'],
})
export class AnimalDetailsComponent {
  @Input()
  animal: Animal;

  @Output()
  decreaseTreatQuantity: EventEmitter<TreatType> = new EventEmitter();

  @Output()
  increaseTreatQuantity: EventEmitter<TreatType> = new EventEmitter();

  @Output()
  deleteAnimal: EventEmitter<void> = new EventEmitter();

  showDeleteConfirm: boolean;

  get isAlpacaLvl1(): boolean {
    return this.animal.type === AnimalType.ALPACA && this.animal.level === 1;
  }

  onDecreaseTreatQuantity(type: TreatType) {
    this.decreaseTreatQuantity.emit(type);
  }

  onIncreaseTreatQuantity(type: TreatType) {
    this.increaseTreatQuantity.emit(type);
  }

  onDeleteAnimal() {
    this.showDeleteConfirm = true;
  }

  onConfirmDelete() {
    this.deleteAnimal.emit();
    this.showDeleteConfirm = false;
  }

  onCancelDelete() {
    this.showDeleteConfirm = false;
  }
}
