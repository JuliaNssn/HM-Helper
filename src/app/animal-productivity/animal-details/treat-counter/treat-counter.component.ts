import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AnimalProductivityFacade } from '../../+state/animal-productivity.facade';
import {
  AnimalEntity,
  AnimalEntityMap,
  AnimalType,
  TreatQuantity,
  TreatType,
} from '../../+state/data-access/data-access.model';

@Component({
  selector: 'app-treat-counter',
  templateUrl: './treat-counter.component.html',
  styleUrls: ['./treat-counter.component.scss'],
})
export class TreatCounterComponent implements OnInit {
  @Input()
  type: AnimalType;

  @Input()
  level: number;

  @Input()
  isAlpacaLvl1: boolean;

  @Input()
  animalTreatCount: TreatQuantity;

  @Output()
  increaseTreatQuantity: EventEmitter<TreatType> = new EventEmitter();

  @Output()
  decreaseTreatQuantity: EventEmitter<TreatType> = new EventEmitter();

  animalEntities: AnimalEntityMap = this.facade.animalEntityMap;
  maxTreatQuantity: TreatQuantity;

  get treatTypes() {
    return Object.values(TreatType);
  }

  get typeTreatQuantity() {
    const treatQuantity = this.animalEntities[this.type];
    return this.isAlpacaLvl1
      ? treatQuantity.treatsForFirstLevelUp
      : treatQuantity.treats;
  }

  constructor(private facade: AnimalProductivityFacade) {}

  ngOnInit() {
    this.maxTreatQuantity = this.facade.getMaxTreatCountForAnimalType(
      this.type
    );
  }

  getQuantityForType(treatType: TreatType) {
    const treatQuantity = this.typeTreatQuantity
      ? this.typeTreatQuantity[treatType]
      : '?';
    const animalTreatCount = this.animalTreatCount
      ? this.animalTreatCount[treatType]
      : '?';

    return this.maxLevelReached(treatType)
      ? `MAX / ${treatQuantity}`
      : `${animalTreatCount} / ${treatQuantity}`;
  }

  maxLevelReached(treatType: TreatType): boolean {
    let treatCount: number = 0;
    if (this.type === AnimalType.ALPACA) {
      if (this.level === 1) {
        treatCount = this.animalTreatCount[treatType];
      } else {
        const treatsForFirstLevel = this.animalEntities[AnimalType.ALPACA]
          .treatsForFirstLevelUp;
        treatCount =
          (!!treatsForFirstLevel ? treatsForFirstLevel[treatType] : 0) +
          (this.level - 2) *
            this.animalEntities[AnimalType.ALPACA].treats[treatType] +
          this.animalTreatCount[treatType];
      }
    } else {
      treatCount =
        (this.level - 1) * this.animalEntities[this.type].treats[treatType] +
        this.animalTreatCount[treatType];
    }

    return treatCount === this.maxTreatQuantity[treatType];
  }

  treatTypeCannotBeDecreased(treatType: TreatType) {
    return !(this.animalTreatCount[treatType] > 0 || this.level > 1);
  }

  onDecreaseTreatQuantity(type: TreatType) {
    this.decreaseTreatQuantity.emit(type);
  }

  onIncreaseTreatQuantity(type: TreatType) {
    this.increaseTreatQuantity.emit(type);
  }
}
